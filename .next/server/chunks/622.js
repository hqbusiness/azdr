exports.id=622,exports.ids=[622],exports.modules={992:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,9404,23)),Promise.resolve().then(r.bind(r,477))},5562:(e,t,r)=>{"use strict";r.d(t,{Z:()=>s});let s=(0,r(2881).Z)("MapPin",[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]])},9730:(e,t,r)=>{"use strict";r.d(t,{Z:()=>s});let s=(0,r(2881).Z)("MessageCircle",[["path",{d:"M7.9 20A9 9 0 1 0 4 16.1L2 22Z",key:"vv11sd"}]])},477:(e,t,r)=>{"use strict";r.d(t,{default:()=>c});var s=r(326),a=r(434),i=r(2881);let l=(0,i.Z)("Star",[["path",{d:"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",key:"r04s7s"}]]);var n=r(5562),d=r(9730);let u=(0,i.Z)("ArrowUpRight",[["path",{d:"M7 7h10v10",key:"1tivn9"}],["path",{d:"M7 17 17 7",key:"1vkiza"}]]);var o=r(4005);function c({id:e,name:t,slug:r,shortDescription:i,description:c,category:E,country:p,city:T,address:h,logoUrl:g,bannerUrl:m,whatsapp:f,phone:N,rating:y=5,featured:b=!1}){let x=(0,o.Nw)(f,t),A=i||(c?c.slice(0,110)+"...":"");return(0,s.jsxs)("div",{className:"group bg-white rounded-2xl border border-slate-200/80 hover:border-brand-500/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden relative",children:[b&&(0,s.jsxs)("div",{className:"absolute top-3 left-3 z-10 bg-amber-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1",children:[s.jsx(l,{className:"w-3 h-3 fill-current"}),"Destacado"]}),(0,s.jsxs)("div",{className:"h-36 sm:h-40 w-full bg-slate-100 relative overflow-hidden",children:[m?s.jsx("img",{src:m,alt:`${t} banner`,className:"w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"}):s.jsx("div",{className:"w-full h-full bg-gradient-to-tr from-slate-800 to-slate-700 flex items-center justify-center text-slate-500",children:s.jsx("span",{className:"text-3xl font-bold text-white/20",children:t.charAt(0)})}),s.jsx("div",{className:"absolute bottom-3 right-3 bg-white/90 backdrop-blur-md text-slate-800 text-xs font-semibold px-2.5 py-1 rounded-lg shadow-sm border border-white/40",children:E?.name||"Comercio"})]}),(0,s.jsxs)("div",{className:"p-5 flex-1 flex flex-col",children:[(0,s.jsxs)("div",{className:"flex items-start gap-3.5 -mt-10 mb-3 relative",children:[s.jsx("div",{className:"w-14 h-14 rounded-2xl bg-white p-1 border-2 border-white shadow-md flex-shrink-0 overflow-hidden relative",children:g?s.jsx("img",{src:g,alt:`${t} logo`,className:"w-full h-full object-cover rounded-xl"}):s.jsx("div",{className:"w-full h-full bg-brand-50 rounded-xl flex items-center justify-center font-bold text-brand-700 text-lg",children:t.charAt(0)})}),(0,s.jsxs)("div",{className:"pt-8 flex-1 min-w-0",children:[s.jsx("h3",{className:"font-bold text-slate-900 text-base leading-snug group-hover:text-brand-600 transition-colors truncate",children:s.jsx(a.default,{href:`/negocios/${r||e}`,children:t})}),(0,s.jsxs)("div",{className:"flex items-center gap-1.5 text-xs text-slate-500 mt-0.5",children:[s.jsx(n.Z,{className:"w-3.5 h-3.5 text-brand-500 flex-shrink-0"}),(0,s.jsxs)("span",{className:"truncate",children:[T,", ",p]})]})]})]}),(0,s.jsxs)("p",{className:"text-xs text-slate-500 line-clamp-1 mb-2.5",children:[s.jsx("span",{className:"font-medium text-slate-600",children:"Direcci\xf3n:"})," ",h]}),s.jsx("p",{className:"text-xs text-slate-600 leading-relaxed mb-4 flex-1 line-clamp-2",children:A}),(0,s.jsxs)("div",{className:"pt-3 border-t border-slate-100 flex items-center gap-2 mt-auto",children:[(0,s.jsxs)("a",{href:x,target:"_blank",rel:"noopener noreferrer",className:"flex-1 inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-medium text-xs shadow-sm shadow-emerald-600/20 transition-all hover:scale-[1.02]",title:`Chatear por WhatsApp con ${t}`,children:[s.jsx(d.Z,{className:"w-4 h-4 fill-emerald-100 text-emerald-800"}),s.jsx("span",{children:"Contactar WhatsApp"})]}),s.jsx(a.default,{href:`/negocios/${r||e}`,className:"p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors",title:"Ver detalles completos y ubicaci\xf3n",children:s.jsx(u,{className:"w-4 h-4"})})]})]})]})}},4005:(e,t,r)=>{"use strict";function s(e,t,r){let s=e?e.replace(/[^0-9]/g,""):"";if(!s)return"#";let a=r;a||(a=t?`\xa1Hola! Vi su negocio "${t}" en AZ DIRECTORIO Empresarial (azdirectorio.com) y me gustar\xeda solicitar m\xe1s informaci\xf3n.`:"\xa1Hola! Vi su negocio en AZ DIRECTORIO Empresarial y me gustar\xeda solicitar informaci\xf3n.");let i=encodeURIComponent(a);return`https://wa.me/${s}?text=${i}`}function a(e){if(!e)return"";let t=e.trim();return t.startsWith("+")?t:`+${t}`}r.d(t,{N3:()=>a,Nw:()=>s})},8463:(e,t,r)=>{"use strict";r.d(t,{Z:()=>s});let s=(0,r(7162).Z)("Building",[["rect",{width:"16",height:"20",x:"4",y:"2",rx:"2",ry:"2",key:"76otgf"}],["path",{d:"M9 22v-4h6v4",key:"r93iot"}],["path",{d:"M8 6h.01",key:"1dz90k"}],["path",{d:"M16 6h.01",key:"1x0f13"}],["path",{d:"M12 6h.01",key:"1vi96p"}],["path",{d:"M12 10h.01",key:"1nrarc"}],["path",{d:"M12 14h.01",key:"1etili"}],["path",{d:"M16 10h.01",key:"1m94wz"}],["path",{d:"M16 14h.01",key:"1gbofw"}],["path",{d:"M8 10h.01",key:"19clt8"}],["path",{d:"M8 14h.01",key:"6423bh"}]])},9832:(e,t,r)=>{"use strict";r.d(t,{Z:()=>s});let s=(0,r(7162).Z)("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]])},7802:(e,t,r)=>{"use strict";r.d(t,{Z:()=>s});let s=(0,r(8570).createProxy)(String.raw`C:\xampp\htdocs\azdr\src\components\BusinessCard.tsx#default`)},6470:(e,t,r)=>{"use strict";r.d(t,{_:()=>g});var s=r(2048),a=r.n(s),i=r(5315),l=r.n(i),n=r(4770),d=r.n(n);let{DatabaseSync:u}=r(5467),o=l().join(process.cwd(),"prisma");a().existsSync(o)||a().mkdirSync(o,{recursive:!0});let c=l().join(o,"directorio.db"),E=function(){if(!global._sqliteDb){let e=new u(c);e.exec(`
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
    `),global._sqliteDb=e}return global._sqliteDb}();function p(){return d().randomUUID()}function T(e){return null==e?e:JSON.parse(JSON.stringify(e))}function h(e,t=!0,r=!1){if(!e)return null;let s={...e,featured:!!e.featured,verified:!!e.verified,latitude:Number(e.latitude),longitude:Number(e.longitude),rating:Number(e.rating)};if(t&&e.categoryId){let t=E.prepare("SELECT * FROM categories WHERE id = ?").get(e.categoryId);s.category=t?{...t}:null}if(r&&e.userId){let t=E.prepare("SELECT id, name, email, image, role FROM users WHERE id = ?").get(e.userId);s.user=t?{...t}:null}return T(s)}let g={user:{findUnique:async({where:e,select:t})=>e.id?E.prepare("SELECT * FROM users WHERE id = ?").get(e.id)||null:e.email&&E.prepare("SELECT * FROM users WHERE email = ?").get(e.email.toLowerCase())||null,create:async({data:e})=>{let t=e.id||p(),r=e.email.toLowerCase(),s=new Date().toISOString();return E.prepare(`
        INSERT INTO users (id, email, name, passwordHash, image, provider, role, createdAt, updatedAt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(t,r,e.name,e.passwordHash||null,e.image||null,e.provider||"credentials",e.role||"USER",s,s),{id:t,email:r,name:e.name,passwordHash:e.passwordHash||null,image:e.image||null,role:e.role||"USER",createdAt:s,updatedAt:s}},upsert:async({where:e,update:t,create:r})=>{let s=await g.user.findUnique({where:e});if(!s)return g.user.create({data:r});{let e=new Date().toISOString();return E.prepare(`
          UPDATE users SET name = COALESCE(?, name), image = COALESCE(?, image), updatedAt = ?
          WHERE id = ?
        `).run(t.name||null,t.image||null,e,s.id),{...s,...t,updatedAt:e}}}},category:{findMany:async e=>{let t=E.prepare("SELECT * FROM categories ORDER BY name ASC").all();if(e?.include?._count?.select?.businesses){let e=E.prepare("SELECT COUNT(*) as count FROM businesses WHERE categoryId = ?");return T(t.map(t=>{let r=e.get(t.id);return{...t,_count:{businesses:r?.count||0}}}))}return T(t.map(e=>({...e})))},findUnique:async({where:e})=>e.slug?E.prepare("SELECT * FROM categories WHERE slug = ?").get(e.slug)||null:e.id&&E.prepare("SELECT * FROM categories WHERE id = ?").get(e.id)||null,upsert:async({where:e,update:t,create:r})=>{let s=await g.category.findUnique({where:e});if(s)return E.prepare(`
          UPDATE categories SET name = ?, icon = ?, description = ?, color = ? WHERE id = ?
        `).run(t.name,t.icon,t.description||null,t.color||null,s.id),{...s,...t};{let e=r.id||p();return E.prepare(`
          INSERT INTO categories (id, slug, name, icon, description, color)
          VALUES (?, ?, ?, ?, ?, ?)
        `).run(e,r.slug,r.name,r.icon,r.description||null,r.color||null),{id:e,...r}}}},business:{findMany:async(e={})=>{let{where:t={},orderBy:r=[],take:s,skip:a=0}=e,i="SELECT * FROM businesses WHERE 1=1",l=[];if(t.OR&&Array.isArray(t.OR)){let e=[];t.OR.forEach(t=>{let r=Object.keys(t)[0],s=t[r]?.contains;s&&(e.push(`${r} LIKE ?`),l.push(`%${s}%`))}),e.length>0&&(i+=` AND (${e.join(" OR ")})`)}if(t.country&&(i+=" AND country = ?",l.push(t.country)),t.city&&(i+=" AND city = ?",l.push(t.city)),void 0!==t.featured&&(i+=" AND featured = ?",l.push(t.featured?1:0)),t.category?.slug){let e=await g.category.findUnique({where:{slug:t.category.slug}});if(!e)return[];i+=" AND categoryId = ?",l.push(e.id)}return t.categoryId&&(i+=" AND categoryId = ?",l.push(t.categoryId)),t.userId&&(i+=" AND userId = ?",l.push(t.userId)),i+=" ORDER BY featured DESC, createdAt DESC",void 0!==s&&(i+=" LIMIT ? OFFSET ?",l.push(s,a)),E.prepare(i).all(...l).map(t=>h(t,!0,!!e?.include?.user))},count:async({where:e={}}={})=>{let t="SELECT COUNT(*) as count FROM businesses WHERE 1=1",r=[];if(e.OR&&Array.isArray(e.OR)){let s=[];e.OR.forEach(e=>{let t=Object.keys(e)[0],a=e[t]?.contains;a&&(s.push(`${t} LIKE ?`),r.push(`%${a}%`))}),s.length>0&&(t+=` AND (${s.join(" OR ")})`)}if(e.country&&(t+=" AND country = ?",r.push(e.country)),e.city&&(t+=" AND city = ?",r.push(e.city)),void 0!==e.featured&&(t+=" AND featured = ?",r.push(e.featured?1:0)),e.category?.slug){let s=await g.category.findUnique({where:{slug:e.category.slug}});if(!s)return 0;t+=" AND categoryId = ?",r.push(s.id)}e.categoryId&&(t+=" AND categoryId = ?",r.push(e.categoryId)),e.userId&&(t+=" AND userId = ?",r.push(e.userId));let s=E.prepare(t).get(...r);return s?.count||0},findFirst:async e=>{let{where:t={},include:r={}}=e,s="SELECT * FROM businesses WHERE 1=1",a=[];if(t.OR&&Array.isArray(t.OR)){let e=[];t.OR.forEach(t=>{t.id?(e.push("id = ?"),a.push(t.id)):t.slug&&(e.push("slug = ?"),a.push(t.slug))}),e.length>0&&(s+=` AND (${e.join(" OR ")})`)}else t.id?(s+=" AND id = ?",a.push(t.id)):t.slug&&(s+=" AND slug = ?",a.push(t.slug));return s+=" LIMIT 1",h(E.prepare(s).get(...a),!0,!!r.user)},findUnique:async e=>g.business.findFirst(e),create:async({data:e,include:t})=>{let r=e.id||p(),s=new Date().toISOString();return E.prepare(`
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
      `).run(r,e.slug,e.name,e.description,e.shortDescription||null,e.categoryId,e.country,e.countryCode||"LATAM",e.city,e.address,Number(e.latitude)||0,Number(e.longitude)||0,e.logoUrl||null,e.bannerUrl||null,e.whatsapp,e.phone||null,e.email||null,e.website||null,e.instagram||null,e.facebook||null,e.linkedin||null,e.schedule||null,e.featured?1:0,void 0!==e.verified?e.verified?1:0:1,Number(e.rating)||5,e.userId,s,s),g.business.findUnique({where:{id:r},include:t})},update:async({where:e,data:t})=>{let r=await g.business.findUnique({where:e});if(!r)throw Error("Business not found");let s=new Date().toISOString();return E.prepare(`
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
      `).run(t.name??null,t.description??null,t.shortDescription??null,t.categoryId??null,t.country??null,t.countryCode??null,t.city??null,t.address??null,void 0!==t.latitude?Number(t.latitude):null,void 0!==t.longitude?Number(t.longitude):null,t.whatsapp??null,t.phone??null,t.email??null,t.website??null,t.instagram??null,t.facebook??null,t.linkedin??null,t.schedule??null,t.logoUrl??null,t.bannerUrl??null,s,r.id),g.business.findUnique({where:{id:r.id}})},delete:async({where:e})=>(E.prepare("DELETE FROM businesses WHERE id = ?").run(e.id),{success:!0}),upsert:async({where:e,update:t,create:r})=>{let s=await g.business.findUnique({where:e});return s?g.business.update({where:{id:s.id},data:t}):g.business.create({data:r})}},$disconnect:async()=>{}}},1150:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>a});var s=r(6621);let a=e=>[{type:"image/png",sizes:"124x124",url:(0,s.fillMetadataSegment)(".",e.params,"icon.png")+"?d165ae15eb490e40"}]}};