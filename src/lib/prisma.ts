import { sqliteDb, generateId } from "./db";

function toPlain<T>(data: T): T {
  if (data === null || data === undefined) return data;
  return JSON.parse(JSON.stringify(data));
}

// Helper to format business record with boolean casts and category relation
function formatBusiness(row: any, includeCategory = true, includeUser = false) {
  if (!row) return null;
  const business: any = {
    ...row,
    featured: Boolean(row.featured),
    verified: Boolean(row.verified),
    latitude: Number(row.latitude),
    longitude: Number(row.longitude),
    rating: Number(row.rating),
  };

  if (includeCategory && row.categoryId) {
    const catQuery = sqliteDb.prepare("SELECT * FROM categories WHERE id = ?");
    const cat = catQuery.get(row.categoryId);
    business.category = cat ? { ...cat } : null;
  }

  if (includeUser && row.userId) {
    const userQuery = sqliteDb.prepare("SELECT id, name, email, image, role FROM users WHERE id = ?");
    const u = userQuery.get(row.userId);
    business.user = u ? { ...u } : null;
  }

  return toPlain(business);
}

export const prisma = {
  user: {
    findUnique: async ({ where, select }: { where: { id?: string; email?: string }; select?: any }) => {
      if (where.id) {
        const stmt = sqliteDb.prepare("SELECT * FROM users WHERE id = ?");
        return stmt.get(where.id) || null;
      }
      if (where.email) {
        const stmt = sqliteDb.prepare("SELECT * FROM users WHERE email = ?");
        return stmt.get(where.email.toLowerCase()) || null;
      }
      return null;
    },

    create: async ({ data }: { data: any }) => {
      const id = data.id || generateId();
      const email = data.email.toLowerCase();
      const now = new Date().toISOString();
      const stmt = sqliteDb.prepare(`
        INSERT INTO users (id, email, name, passwordHash, image, provider, role, createdAt, updatedAt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      stmt.run(
        id,
        email,
        data.name,
        data.passwordHash || null,
        data.image || null,
        data.provider || "credentials",
        data.role || "USER",
        now,
        now
      );
      return {
        id,
        email,
        name: data.name,
        passwordHash: data.passwordHash || null,
        image: data.image || null,
        role: data.role || "USER",
        createdAt: now,
        updatedAt: now,
      };
    },

    upsert: async ({ where, update, create }: { where: { email: string }; update: any; create: any }) => {
      const existing = await prisma.user.findUnique({ where });
      if (existing) {
        const now = new Date().toISOString();
        const stmt = sqliteDb.prepare(`
          UPDATE users SET name = COALESCE(?, name), image = COALESCE(?, image), updatedAt = ?
          WHERE id = ?
        `);
        stmt.run(update.name || null, update.image || null, now, existing.id);
        return { ...existing, ...update, updatedAt: now };
      } else {
        return prisma.user.create({ data: create });
      }
    },
  },

  category: {
    findMany: async (args?: { include?: any; orderBy?: any }) => {
      const stmt = sqliteDb.prepare("SELECT * FROM categories ORDER BY name ASC");
      const categories = stmt.all() as any[];

      if (args?.include?._count?.select?.businesses) {
        const countStmt = sqliteDb.prepare("SELECT COUNT(*) as count FROM businesses WHERE categoryId = ?");
        return toPlain(
          categories.map((cat) => {
            const res = countStmt.get(cat.id) as any;
            return {
              ...cat,
              _count: { businesses: res?.count || 0 },
            };
          })
        );
      }

      return toPlain(categories.map((c) => ({ ...c })));
    },

    findUnique: async ({ where }: { where: { id?: string; slug?: string } }) => {
      if (where.slug) {
        const stmt = sqliteDb.prepare("SELECT * FROM categories WHERE slug = ?");
        return stmt.get(where.slug) || null;
      }
      if (where.id) {
        const stmt = sqliteDb.prepare("SELECT * FROM categories WHERE id = ?");
        return stmt.get(where.id) || null;
      }
      return null;
    },

    upsert: async ({ where, update, create }: { where: { slug: string }; update: any; create: any }) => {
      const existing = await prisma.category.findUnique({ where });
      if (existing) {
        const stmt = sqliteDb.prepare(`
          UPDATE categories SET name = ?, icon = ?, description = ?, color = ? WHERE id = ?
        `);
        stmt.run(update.name, update.icon, update.description || null, update.color || null, existing.id);
        return { ...existing, ...update };
      } else {
        const id = create.id || generateId();
        const stmt = sqliteDb.prepare(`
          INSERT INTO categories (id, slug, name, icon, description, color)
          VALUES (?, ?, ?, ?, ?, ?)
        `);
        stmt.run(id, create.slug, create.name, create.icon, create.description || null, create.color || null);
        return { id, ...create };
      }
    },
  },

  business: {
    findMany: async (args: any = {}) => {
      const { where = {}, orderBy = [], take, skip = 0 } = args;
      let sql = "SELECT * FROM businesses WHERE 1=1";
      const params: any[] = [];

      if (where.OR && Array.isArray(where.OR)) {
        const orClauses: string[] = [];
        where.OR.forEach((clause: any) => {
          const key = Object.keys(clause)[0];
          const val = clause[key]?.contains;
          if (val) {
            orClauses.push(`${key} LIKE ?`);
            params.push(`%${val}%`);
          }
        });
        if (orClauses.length > 0) {
          sql += ` AND (${orClauses.join(" OR ")})`;
        }
      }

      if (where.country) {
        sql += " AND country = ?";
        params.push(where.country);
      }

      if (where.city) {
        sql += " AND city = ?";
        params.push(where.city);
      }

      if (where.featured !== undefined) {
        sql += " AND featured = ?";
        params.push(where.featured ? 1 : 0);
      }

      if (where.category?.slug) {
        const cat = await prisma.category.findUnique({ where: { slug: where.category.slug } });
        if (cat) {
          sql += " AND categoryId = ?";
          params.push(cat.id);
        } else {
          return [];
        }
      }

      if (where.categoryId) {
        sql += " AND categoryId = ?";
        params.push(where.categoryId);
      }

      if (where.userId) {
        sql += " AND userId = ?";
        params.push(where.userId);
      }

      // Order
      sql += " ORDER BY featured DESC, createdAt DESC";

      if (take !== undefined) {
        sql += ` LIMIT ? OFFSET ?`;
        params.push(take, skip);
      }

      const stmt = sqliteDb.prepare(sql);
      const rows = stmt.all(...params) as any[];
      return rows.map((r) => formatBusiness(r, true, Boolean(args?.include?.user)));
    },

    count: async ({ where = {} }: { where?: any } = {}) => {
      let sql = "SELECT COUNT(*) as count FROM businesses WHERE 1=1";
      const params: any[] = [];

      if (where.OR && Array.isArray(where.OR)) {
        const orClauses: string[] = [];
        where.OR.forEach((clause: any) => {
          const key = Object.keys(clause)[0];
          const val = clause[key]?.contains;
          if (val) {
            orClauses.push(`${key} LIKE ?`);
            params.push(`%${val}%`);
          }
        });
        if (orClauses.length > 0) {
          sql += ` AND (${orClauses.join(" OR ")})`;
        }
      }

      if (where.country) {
        sql += " AND country = ?";
        params.push(where.country);
      }

      if (where.city) {
        sql += " AND city = ?";
        params.push(where.city);
      }

      if (where.featured !== undefined) {
        sql += " AND featured = ?";
        params.push(where.featured ? 1 : 0);
      }

      if (where.category?.slug) {
        const cat = await prisma.category.findUnique({ where: { slug: where.category.slug } });
        if (cat) {
          sql += " AND categoryId = ?";
          params.push(cat.id);
        } else {
          return 0;
        }
      }

      if (where.categoryId) {
        sql += " AND categoryId = ?";
        params.push(where.categoryId);
      }

      if (where.userId) {
        sql += " AND userId = ?";
        params.push(where.userId);
      }

      const stmt = sqliteDb.prepare(sql);
      const result = stmt.get(...params) as any;
      return result?.count || 0;
    },

    findFirst: async (args: any) => {
      const { where = {}, include = {} } = args;
      let sql = "SELECT * FROM businesses WHERE 1=1";
      const params: any[] = [];

      if (where.OR && Array.isArray(where.OR)) {
        const orClauses: string[] = [];
        where.OR.forEach((clause: any) => {
          if (clause.id) {
            orClauses.push("id = ?");
            params.push(clause.id);
          } else if (clause.slug) {
            orClauses.push("slug = ?");
            params.push(clause.slug);
          }
        });
        if (orClauses.length > 0) {
          sql += ` AND (${orClauses.join(" OR ")})`;
        }
      } else if (where.id) {
        sql += " AND id = ?";
        params.push(where.id);
      } else if (where.slug) {
        sql += " AND slug = ?";
        params.push(where.slug);
      }

      sql += " LIMIT 1";
      const stmt = sqliteDb.prepare(sql);
      const row = stmt.get(...params);
      return formatBusiness(row, true, Boolean(include.user));
    },

    findUnique: async (args: any) => {
      return prisma.business.findFirst(args);
    },

    create: async ({ data, include }: { data: any; include?: any }) => {
      const id = data.id || generateId();
      const now = new Date().toISOString();
      const stmt = sqliteDb.prepare(`
        INSERT INTO businesses (
          id, slug, name, description, shortDescription, categoryId,
          country, countryCode, city, address, latitude, longitude,
          logoUrl, bannerUrl, whatsapp, phone, email, website,
          instagram, facebook, linkedin, schedule, featured, verified,
          rating, userId, createdAt, updatedAt
        ) VALUES (
          ?, ?, ?, ?, ?, ?,
          ?, ?, ?, ?, ?, ?,
          ?, ?, ?, ?, ?, ?,
          ?, ?, ?, ?, ?, ?,
          ?, ?, ?, ?
        )
      `);

      stmt.run(
        id,
        data.slug,
        data.name,
        data.description,
        data.shortDescription || null,
        data.categoryId,
        data.country,
        data.countryCode || "LATAM",
        data.city,
        data.address,
        Number(data.latitude) || 0,
        Number(data.longitude) || 0,
        data.logoUrl || null,
        data.bannerUrl || null,
        data.whatsapp,
        data.phone || null,
        data.email || null,
        data.website || null,
        data.instagram || null,
        data.facebook || null,
        data.linkedin || null,
        data.schedule || null,
        data.featured ? 1 : 0,
        data.verified !== undefined ? (data.verified ? 1 : 0) : 1,
        Number(data.rating) || 5.0,
        data.userId,
        now,
        now
      );

      return prisma.business.findUnique({ where: { id }, include });
    },

    update: async ({ where, data }: { where: { id: string }; data: any }) => {
      const existing = await prisma.business.findUnique({ where });
      if (!existing) throw new Error("Business not found");

      const now = new Date().toISOString();
      const stmt = sqliteDb.prepare(`
        UPDATE businesses SET
          name = COALESCE(?, name),
          description = COALESCE(?, description),
          shortDescription = COALESCE(?, shortDescription),
          categoryId = COALESCE(?, categoryId),
          country = COALESCE(?, country),
          countryCode = COALESCE(?, countryCode),
          city = COALESCE(?, city),
          address = COALESCE(?, address),
          latitude = COALESCE(?, latitude),
          longitude = COALESCE(?, longitude),
          whatsapp = COALESCE(?, whatsapp),
          phone = COALESCE(?, phone),
          email = COALESCE(?, email),
          website = COALESCE(?, website),
          instagram = COALESCE(?, instagram),
          facebook = COALESCE(?, facebook),
          linkedin = COALESCE(?, linkedin),
          schedule = COALESCE(?, schedule),
          logoUrl = COALESCE(?, logoUrl),
          bannerUrl = COALESCE(?, bannerUrl),
          updatedAt = ?
        WHERE id = ?
      `);

      stmt.run(
        data.name ?? null,
        data.description ?? null,
        data.shortDescription ?? null,
        data.categoryId ?? null,
        data.country ?? null,
        data.countryCode ?? null,
        data.city ?? null,
        data.address ?? null,
        data.latitude !== undefined ? Number(data.latitude) : null,
        data.longitude !== undefined ? Number(data.longitude) : null,
        data.whatsapp ?? null,
        data.phone ?? null,
        data.email ?? null,
        data.website ?? null,
        data.instagram ?? null,
        data.facebook ?? null,
        data.linkedin ?? null,
        data.schedule ?? null,
        data.logoUrl ?? null,
        data.bannerUrl ?? null,
        now,
        existing.id
      );

      return prisma.business.findUnique({ where: { id: existing.id } });
    },

    delete: async ({ where }: { where: { id: string } }) => {
      const stmt = sqliteDb.prepare("DELETE FROM businesses WHERE id = ?");
      stmt.run(where.id);
      return { success: true };
    },

    upsert: async ({ where, update, create }: { where: { slug: string }; update: any; create: any }) => {
      const existing = await prisma.business.findUnique({ where });
      if (existing) {
        return prisma.business.update({ where: { id: existing.id }, data: update });
      } else {
        return prisma.business.create({ data: create });
      }
    },
  },

  $disconnect: async () => {
    // sqlite connection cleanup handled automatically on process exit
  },
};
