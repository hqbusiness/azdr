"use strict";exports.id=456,exports.ids=[456],exports.modules={5456:(e,r,n)=>{n.d(r,{Gv:()=>c,HI:()=>g,c_:()=>o,fT:()=>T,ts:()=>p});var t=n(2023),i=n.n(t),s=n(1482),u=n.n(s),a=n(1615),l=n(6470);let E=process.env.JWT_SECRET||"default_jwt_secret_latam_directory_2026",d="azdr_auth_token";async function o(e){return i().hash(e,10)}async function c(e,r){return i().compare(e,r)}function T(e){return u().sign({id:e.id,email:e.email,name:e.name,role:e.role,image:e.image},E,{expiresIn:"7d"})}async function p(){try{let e=(0,a.cookies)(),r=e.get(d)?.value;if(!r)return null;let n=function(e){try{return u().verify(e,E)}catch{return null}}(r);if(!n?.id)return null;let t=await l._.user.findUnique({where:{id:n.id}});if(!t)return null;return{id:t.id,email:t.email,name:t.name,role:t.role,image:t.image}}catch{return null}}let g=d},6470:(e,r,n)=>{n.d(r,{_:()=>A});var t=n(2048),i=n.n(t),s=n(5315),u=n.n(s),a=n(4770),l=n.n(a);let{DatabaseSync:E}=n(5467),d=u().join(process.cwd(),"prisma");i().existsSync(d)||i().mkdirSync(d,{recursive:!0});let o=u().join(d,"directorio.db"),c=function(){if(!global._sqliteDb){let e=new E(o);e.exec(`
      PRAGMA foreign_keys = ON;

      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        passwordHash TEXT,
        image TEXT,
        provider TEXT DEFAULT 'credentials',
        role TEXT DEFAULT 'USER',
        createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
        updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS categories (
        id TEXT PRIMARY KEY,
        slug TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        icon TEXT NOT NULL,
        description TEXT,
        color TEXT
      );

      CREATE TABLE IF NOT EXISTS businesses (
        id TEXT PRIMARY KEY,
        slug TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        shortDescription TEXT,
        categoryId TEXT NOT NULL,
        country TEXT NOT NULL,
        countryCode TEXT NOT NULL,
        city TEXT NOT NULL,
        address TEXT NOT NULL,
        latitude REAL NOT NULL,
        longitude REAL NOT NULL,
        logoUrl TEXT,
        bannerUrl TEXT,
        whatsapp TEXT NOT NULL,
        phone TEXT,
        email TEXT,
        website TEXT,
        instagram TEXT,
        facebook TEXT,
        linkedin TEXT,
        schedule TEXT,
        featured INTEGER DEFAULT 0,
        verified INTEGER DEFAULT 1,
        rating REAL DEFAULT 5.0,
        userId TEXT NOT NULL,
        createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
        updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (categoryId) REFERENCES categories(id) ON DELETE RESTRICT,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
      );

      CREATE INDEX IF NOT EXISTS idx_businesses_city ON businesses(city);
      CREATE INDEX IF NOT EXISTS idx_businesses_country ON businesses(country);
      CREATE INDEX IF NOT EXISTS idx_businesses_category ON businesses(categoryId);
      CREATE INDEX IF NOT EXISTS idx_businesses_featured ON businesses(featured);
    `),global._sqliteDb=e}return global._sqliteDb}();function T(){return l().randomUUID()}function p(e){return null==e?e:JSON.parse(JSON.stringify(e))}function g(e,r=!0,n=!1){if(!e)return null;let t={...e,featured:!!e.featured,verified:!!e.verified,latitude:Number(e.latitude),longitude:Number(e.longitude),rating:Number(e.rating)};if(r&&e.categoryId){let r=c.prepare("SELECT * FROM categories WHERE id = ?").get(e.categoryId);t.category=r?{...r}:null}if(n&&e.userId){let r=c.prepare("SELECT id, name, email, image, role FROM users WHERE id = ?").get(e.userId);t.user=r?{...r}:null}return p(t)}let A={user:{findUnique:async({where:e,select:r})=>e.id?c.prepare("SELECT * FROM users WHERE id = ?").get(e.id)||null:e.email&&c.prepare("SELECT * FROM users WHERE email = ?").get(e.email.toLowerCase())||null,create:async({data:e})=>{let r=e.id||T(),n=e.email.toLowerCase(),t=new Date().toISOString();return c.prepare(`
        INSERT INTO users (id, email, name, passwordHash, image, provider, role, createdAt, updatedAt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(r,n,e.name,e.passwordHash||null,e.image||null,e.provider||"credentials",e.role||"USER",t,t),{id:r,email:n,name:e.name,passwordHash:e.passwordHash||null,image:e.image||null,role:e.role||"USER",createdAt:t,updatedAt:t}},upsert:async({where:e,update:r,create:n})=>{let t=await A.user.findUnique({where:e});if(!t)return A.user.create({data:n});{let e=new Date().toISOString();return c.prepare(`
          UPDATE users SET name = COALESCE(?, name), image = COALESCE(?, image), updatedAt = ?
          WHERE id = ?
        `).run(r.name||null,r.image||null,e,t.id),{...t,...r,updatedAt:e}}}},category:{findMany:async e=>{let r=c.prepare("SELECT * FROM categories ORDER BY name ASC").all();if(e?.include?._count?.select?.businesses){let e=c.prepare("SELECT COUNT(*) as count FROM businesses WHERE categoryId = ?");return p(r.map(r=>{let n=e.get(r.id);return{...r,_count:{businesses:n?.count||0}}}))}return p(r.map(e=>({...e})))},findUnique:async({where:e})=>e.slug?c.prepare("SELECT * FROM categories WHERE slug = ?").get(e.slug)||null:e.id&&c.prepare("SELECT * FROM categories WHERE id = ?").get(e.id)||null,upsert:async({where:e,update:r,create:n})=>{let t=await A.category.findUnique({where:e});if(t)return c.prepare(`
          UPDATE categories SET name = ?, icon = ?, description = ?, color = ? WHERE id = ?
        `).run(r.name,r.icon,r.description||null,r.color||null,t.id),{...t,...r};{let e=n.id||T();return c.prepare(`
          INSERT INTO categories (id, slug, name, icon, description, color)
          VALUES (?, ?, ?, ?, ?, ?)
        `).run(e,n.slug,n.name,n.icon,n.description||null,n.color||null),{id:e,...n}}}},business:{findMany:async(e={})=>{let{where:r={},orderBy:n=[],take:t,skip:i=0}=e,s="SELECT * FROM businesses WHERE 1=1",u=[];if(r.OR&&Array.isArray(r.OR)){let e=[];r.OR.forEach(r=>{let n=Object.keys(r)[0],t=r[n]?.contains;t&&(e.push(`${n} LIKE ?`),u.push(`%${t}%`))}),e.length>0&&(s+=` AND (${e.join(" OR ")})`)}if(r.country&&(s+=" AND country = ?",u.push(r.country)),r.city&&(s+=" AND city = ?",u.push(r.city)),void 0!==r.featured&&(s+=" AND featured = ?",u.push(r.featured?1:0)),r.category?.slug){let e=await A.category.findUnique({where:{slug:r.category.slug}});if(!e)return[];s+=" AND categoryId = ?",u.push(e.id)}return r.categoryId&&(s+=" AND categoryId = ?",u.push(r.categoryId)),r.userId&&(s+=" AND userId = ?",u.push(r.userId)),s+=" ORDER BY featured DESC, createdAt DESC",void 0!==t&&(s+=" LIMIT ? OFFSET ?",u.push(t,i)),c.prepare(s).all(...u).map(r=>g(r,!0,!!e?.include?.user))},count:async({where:e={}}={})=>{let r="SELECT COUNT(*) as count FROM businesses WHERE 1=1",n=[];if(e.OR&&Array.isArray(e.OR)){let t=[];e.OR.forEach(e=>{let r=Object.keys(e)[0],i=e[r]?.contains;i&&(t.push(`${r} LIKE ?`),n.push(`%${i}%`))}),t.length>0&&(r+=` AND (${t.join(" OR ")})`)}if(e.country&&(r+=" AND country = ?",n.push(e.country)),e.city&&(r+=" AND city = ?",n.push(e.city)),void 0!==e.featured&&(r+=" AND featured = ?",n.push(e.featured?1:0)),e.category?.slug){let t=await A.category.findUnique({where:{slug:e.category.slug}});if(!t)return 0;r+=" AND categoryId = ?",n.push(t.id)}e.categoryId&&(r+=" AND categoryId = ?",n.push(e.categoryId)),e.userId&&(r+=" AND userId = ?",n.push(e.userId));let t=c.prepare(r).get(...n);return t?.count||0},findFirst:async e=>{let{where:r={},include:n={}}=e,t="SELECT * FROM businesses WHERE 1=1",i=[];if(r.OR&&Array.isArray(r.OR)){let e=[];r.OR.forEach(r=>{r.id?(e.push("id = ?"),i.push(r.id)):r.slug&&(e.push("slug = ?"),i.push(r.slug))}),e.length>0&&(t+=` AND (${e.join(" OR ")})`)}else r.id?(t+=" AND id = ?",i.push(r.id)):r.slug&&(t+=" AND slug = ?",i.push(r.slug));return t+=" LIMIT 1",g(c.prepare(t).get(...i),!0,!!n.user)},findUnique:async e=>A.business.findFirst(e),create:async({data:e,include:r})=>{let n=e.id||T(),t=new Date().toISOString();return c.prepare(`
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
      `).run(n,e.slug,e.name,e.description,e.shortDescription||null,e.categoryId,e.country,e.countryCode||"LATAM",e.city,e.address,Number(e.latitude)||0,Number(e.longitude)||0,e.logoUrl||null,e.bannerUrl||null,e.whatsapp,e.phone||null,e.email||null,e.website||null,e.instagram||null,e.facebook||null,e.linkedin||null,e.schedule||null,e.featured?1:0,void 0!==e.verified?e.verified?1:0:1,Number(e.rating)||5,e.userId,t,t),A.business.findUnique({where:{id:n},include:r})},update:async({where:e,data:r})=>{let n=await A.business.findUnique({where:e});if(!n)throw Error("Business not found");let t=new Date().toISOString();return c.prepare(`
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
      `).run(r.name??null,r.description??null,r.shortDescription??null,r.categoryId??null,r.country??null,r.countryCode??null,r.city??null,r.address??null,void 0!==r.latitude?Number(r.latitude):null,void 0!==r.longitude?Number(r.longitude):null,r.whatsapp??null,r.phone??null,r.email??null,r.website??null,r.instagram??null,r.facebook??null,r.linkedin??null,r.schedule??null,r.logoUrl??null,r.bannerUrl??null,t,n.id),A.business.findUnique({where:{id:n.id}})},delete:async({where:e})=>(c.prepare("DELETE FROM businesses WHERE id = ?").run(e.id),{success:!0}),upsert:async({where:e,update:r,create:n})=>{let t=await A.business.findUnique({where:e});return t?A.business.update({where:{id:t.id},data:r}):A.business.create({data:n})}},$disconnect:async()=>{}}}};