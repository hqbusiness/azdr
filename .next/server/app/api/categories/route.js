"use strict";(()=>{var e={};e.id=961,e.ids=[961],e.modules={399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},4770:e=>{e.exports=require("crypto")},2048:e=>{e.exports=require("fs")},5315:e=>{e.exports=require("path")},5467:e=>{e.exports=require("node:sqlite")},6854:(e,r,t)=>{t.r(r),t.d(r,{originalPathname:()=>p,patchFetch:()=>g,requestAsyncStorage:()=>E,routeModule:()=>d,serverHooks:()=>T,staticGenerationAsyncStorage:()=>c});var s={};t.r(s),t.d(s,{GET:()=>o});var n=t(9303),i=t(8716),a=t(3131),u=t(7070),l=t(6470);async function o(){try{let e=await l._.category.findMany({include:{_count:{select:{businesses:!0}}},orderBy:{name:"asc"}});return u.NextResponse.json({categories:e})}catch(e){return console.error("Error al obtener categor\xedas:",e),u.NextResponse.json({error:"Error al cargar categor\xedas."},{status:500})}}let d=new n.AppRouteRouteModule({definition:{kind:i.x.APP_ROUTE,page:"/api/categories/route",pathname:"/api/categories",filename:"route",bundlePath:"app/api/categories/route"},resolvedPagePath:"C:\\xampp\\htdocs\\azdr\\src\\app\\api\\categories\\route.ts",nextConfigOutput:"",userland:s}),{requestAsyncStorage:E,staticGenerationAsyncStorage:c,serverHooks:T}=d,p="/api/categories/route";function g(){return(0,a.patchFetch)({serverHooks:T,staticGenerationAsyncStorage:c})}},6470:(e,r,t)=>{t.d(r,{_:()=>A});var s=t(2048),n=t.n(s),i=t(5315),a=t.n(i),u=t(4770),l=t.n(u);let{DatabaseSync:o}=t(5467),d=a().join(process.cwd(),"prisma");n().existsSync(d)||n().mkdirSync(d,{recursive:!0});let E=a().join(d,"directorio.db"),c=function(){if(!global._sqliteDb){let e=new o(E);e.exec(`
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
    `),global._sqliteDb=e}return global._sqliteDb}();function T(){return l().randomUUID()}function p(e){return null==e?e:JSON.parse(JSON.stringify(e))}function g(e,r=!0,t=!1){if(!e)return null;let s={...e,featured:!!e.featured,verified:!!e.verified,latitude:Number(e.latitude),longitude:Number(e.longitude),rating:Number(e.rating)};if(r&&e.categoryId){let r=c.prepare("SELECT * FROM categories WHERE id = ?").get(e.categoryId);s.category=r?{...r}:null}if(t&&e.userId){let r=c.prepare("SELECT id, name, email, image, role FROM users WHERE id = ?").get(e.userId);s.user=r?{...r}:null}return p(s)}let A={user:{findUnique:async({where:e,select:r})=>e.id?c.prepare("SELECT * FROM users WHERE id = ?").get(e.id)||null:e.email&&c.prepare("SELECT * FROM users WHERE email = ?").get(e.email.toLowerCase())||null,create:async({data:e})=>{let r=e.id||T(),t=e.email.toLowerCase(),s=new Date().toISOString();return c.prepare(`
        INSERT INTO users (id, email, name, passwordHash, image, provider, role, createdAt, updatedAt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(r,t,e.name,e.passwordHash||null,e.image||null,e.provider||"credentials",e.role||"USER",s,s),{id:r,email:t,name:e.name,passwordHash:e.passwordHash||null,image:e.image||null,role:e.role||"USER",createdAt:s,updatedAt:s}},upsert:async({where:e,update:r,create:t})=>{let s=await A.user.findUnique({where:e});if(!s)return A.user.create({data:t});{let e=new Date().toISOString();return c.prepare(`
          UPDATE users SET name = COALESCE(?, name), image = COALESCE(?, image), updatedAt = ?
          WHERE id = ?
        `).run(r.name||null,r.image||null,e,s.id),{...s,...r,updatedAt:e}}}},category:{findMany:async e=>{let r=c.prepare("SELECT * FROM categories ORDER BY name ASC").all();if(e?.include?._count?.select?.businesses){let e=c.prepare("SELECT COUNT(*) as count FROM businesses WHERE categoryId = ?");return p(r.map(r=>{let t=e.get(r.id);return{...r,_count:{businesses:t?.count||0}}}))}return p(r.map(e=>({...e})))},findUnique:async({where:e})=>e.slug?c.prepare("SELECT * FROM categories WHERE slug = ?").get(e.slug)||null:e.id&&c.prepare("SELECT * FROM categories WHERE id = ?").get(e.id)||null,upsert:async({where:e,update:r,create:t})=>{let s=await A.category.findUnique({where:e});if(s)return c.prepare(`
          UPDATE categories SET name = ?, icon = ?, description = ?, color = ? WHERE id = ?
        `).run(r.name,r.icon,r.description||null,r.color||null,s.id),{...s,...r};{let e=t.id||T();return c.prepare(`
          INSERT INTO categories (id, slug, name, icon, description, color)
          VALUES (?, ?, ?, ?, ?, ?)
        `).run(e,t.slug,t.name,t.icon,t.description||null,t.color||null),{id:e,...t}}}},business:{findMany:async(e={})=>{let{where:r={},orderBy:t=[],take:s,skip:n=0}=e,i="SELECT * FROM businesses WHERE 1=1",a=[];if(r.OR&&Array.isArray(r.OR)){let e=[];r.OR.forEach(r=>{let t=Object.keys(r)[0],s=r[t]?.contains;s&&(e.push(`${t} LIKE ?`),a.push(`%${s}%`))}),e.length>0&&(i+=` AND (${e.join(" OR ")})`)}if(r.country&&(i+=" AND country = ?",a.push(r.country)),r.city&&(i+=" AND city = ?",a.push(r.city)),void 0!==r.featured&&(i+=" AND featured = ?",a.push(r.featured?1:0)),r.category?.slug){let e=await A.category.findUnique({where:{slug:r.category.slug}});if(!e)return[];i+=" AND categoryId = ?",a.push(e.id)}return r.categoryId&&(i+=" AND categoryId = ?",a.push(r.categoryId)),r.userId&&(i+=" AND userId = ?",a.push(r.userId)),i+=" ORDER BY featured DESC, createdAt DESC",void 0!==s&&(i+=" LIMIT ? OFFSET ?",a.push(s,n)),c.prepare(i).all(...a).map(r=>g(r,!0,!!e?.include?.user))},count:async({where:e={}}={})=>{let r="SELECT COUNT(*) as count FROM businesses WHERE 1=1",t=[];if(e.OR&&Array.isArray(e.OR)){let s=[];e.OR.forEach(e=>{let r=Object.keys(e)[0],n=e[r]?.contains;n&&(s.push(`${r} LIKE ?`),t.push(`%${n}%`))}),s.length>0&&(r+=` AND (${s.join(" OR ")})`)}if(e.country&&(r+=" AND country = ?",t.push(e.country)),e.city&&(r+=" AND city = ?",t.push(e.city)),void 0!==e.featured&&(r+=" AND featured = ?",t.push(e.featured?1:0)),e.category?.slug){let s=await A.category.findUnique({where:{slug:e.category.slug}});if(!s)return 0;r+=" AND categoryId = ?",t.push(s.id)}e.categoryId&&(r+=" AND categoryId = ?",t.push(e.categoryId)),e.userId&&(r+=" AND userId = ?",t.push(e.userId));let s=c.prepare(r).get(...t);return s?.count||0},findFirst:async e=>{let{where:r={},include:t={}}=e,s="SELECT * FROM businesses WHERE 1=1",n=[];if(r.OR&&Array.isArray(r.OR)){let e=[];r.OR.forEach(r=>{r.id?(e.push("id = ?"),n.push(r.id)):r.slug&&(e.push("slug = ?"),n.push(r.slug))}),e.length>0&&(s+=` AND (${e.join(" OR ")})`)}else r.id?(s+=" AND id = ?",n.push(r.id)):r.slug&&(s+=" AND slug = ?",n.push(r.slug));return s+=" LIMIT 1",g(c.prepare(s).get(...n),!0,!!t.user)},findUnique:async e=>A.business.findFirst(e),create:async({data:e,include:r})=>{let t=e.id||T(),s=new Date().toISOString();return c.prepare(`
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
      `).run(t,e.slug,e.name,e.description,e.shortDescription||null,e.categoryId,e.country,e.countryCode||"LATAM",e.city,e.address,Number(e.latitude)||0,Number(e.longitude)||0,e.logoUrl||null,e.bannerUrl||null,e.whatsapp,e.phone||null,e.email||null,e.website||null,e.instagram||null,e.facebook||null,e.linkedin||null,e.schedule||null,e.featured?1:0,void 0!==e.verified?e.verified?1:0:1,Number(e.rating)||5,e.userId,s,s),A.business.findUnique({where:{id:t},include:r})},update:async({where:e,data:r})=>{let t=await A.business.findUnique({where:e});if(!t)throw Error("Business not found");let s=new Date().toISOString();return c.prepare(`
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
      `).run(r.name??null,r.description??null,r.shortDescription??null,r.categoryId??null,r.country??null,r.countryCode??null,r.city??null,r.address??null,void 0!==r.latitude?Number(r.latitude):null,void 0!==r.longitude?Number(r.longitude):null,r.whatsapp??null,r.phone??null,r.email??null,r.website??null,r.instagram??null,r.facebook??null,r.linkedin??null,r.schedule??null,r.logoUrl??null,r.bannerUrl??null,s,t.id),A.business.findUnique({where:{id:t.id}})},delete:async({where:e})=>(c.prepare("DELETE FROM businesses WHERE id = ?").run(e.id),{success:!0}),upsert:async({where:e,update:r,create:t})=>{let s=await A.business.findUnique({where:e});return s?A.business.update({where:{id:s.id},data:r}):A.business.create({data:t})}},$disconnect:async()=>{}}}};var r=require("../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),s=r.X(0,[948,972],()=>t(6854));module.exports=s})();