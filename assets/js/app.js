/* Shared presentation and slideshow logic. Routine content edits belong in data/*.js. */
(() => {
  'use strict';
  const data = window.LAB || {};
  const profile = data.site || {};
  const target = document.getElementById('page-content');
  const escape = (value) => String(value ?? '').replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const safeUrl = (value) => {
    const url = String(value || '').trim();
    return /^(https?:\/\/|mailto:)/i.test(url) || /^(assets\/|[a-z0-9-]+\.html(?:#.*)?$|#[a-z0-9-]+$)/i.test(url) ? url : '';
  };
  const link = (href, text, className = 'text-link') => {
    const url = safeUrl(href);
    if (!url) return `<span>${escape(text)}</span>`;
    const external = /^https?:\/\//i.test(url);
    return `<a class="${className}" href="${escape(url)}"${external ? ' target="_blank" rel="noopener noreferrer"' : ''}>${escape(text)}${external ? ' <span aria-hidden="true">↗</span>' : ''}</a>`;
  };
  const initials = (name) => String(name || '').split(/\s+/).filter(Boolean).slice(0,2).map(s => s[0]).join('');
  const photo = (src, alt, label = 'Photograph to be added', extraClass = '', position = '50% 50%', eager = false) => {
    const url = safeUrl(src);
    const positionSafe = /^\d{1,3}% \d{1,3}%$/.test(position) ? position : '50% 50%';
    return `<div class="media ${extraClass}">${url ? `<img src="${escape(url)}" alt="${escape(alt)}" loading="${eager?'eager':'lazy'}" decoding="async" style="object-position:${positionSafe}">` : ''}<div class="photo-placeholder"${url ? ' hidden' : ''}><span class="placeholder-mark" aria-hidden="true">${escape(extraClass.includes('portrait') ? initials(alt) : '+')}</span><span>${escape(label)}</span></div></div>`;
  };
  const logo = (src, name, abbreviation) => {
    const url = safeUrl(src);
    return `<div class="logo-slot">${url ? `<img src="${escape(url)}" alt="${escape(name)} logo" loading="lazy"><span hidden>${escape(abbreviation || name)}</span>` : `<span>${escape(abbreviation || name)}</span>`}</div>`;
  };
  const paragraphs = (items) => (items || []).map(p=>`<p>${escape(p)}</p>`).join('');
  let galleryId = 0;
  const gallery = (items, title, kind = 'instrument') => {
    const id = `gallery-${galleryId++}`;
    const actual = kind === 'home' ? items.filter(s=>safeUrl(s.image)) : items;
    const slides = actual.length ? actual : [{image:'',caption:'Add your selected homepage photographs',alt:'Homepage photograph'}];
    const canAutoplay = slides.filter(s=>safeUrl(s.image)).length > 1;
    return `<section class="gallery ${kind==='home'?'home-gallery':'instrument-gallery'}" data-gallery data-autoplay="${canAutoplay}" aria-label="${escape(title)}" aria-roledescription="carousel">
      <div class="gallery-stage" id="${id}">${slides.map((s,i)=>`<figure class="slide" data-slide ${i?'hidden':''}>${photo(s.image,s.alt||s.name||s.caption,kind==='home'?'Your new homepage photographs will appear here':`Photo to be added · ${s.name}`,'',s.position||'50% 50%',kind==='home'&&i===0)}<figcaption><span class="slide-kicker">${escape(kind==='home'?'Professor Gazala Habib':title)}</span><h3>${escape(s.caption||s.name)}</h3>${s.description?`<p>${escape(s.description)}</p>`:''}${s.credit?`<small>${escape(s.credit)}</small>`:''}</figcaption></figure>`).join('')}</div>
      ${slides.length>1?`<div class="gallery-controls"><div class="gallery-buttons"><button type="button" data-prev aria-label="Previous photograph" aria-controls="${id}">←</button><button type="button" data-next aria-label="Next photograph" aria-controls="${id}">→</button></div><span class="gallery-count" data-count aria-live="off">1 / ${slides.length}</span>${canAutoplay?'<button type="button" data-play aria-label="Pause slideshow">Pause</button>':''}</div>`:''}
    </section>`;
  };
  const home = () => ((profile.homePhotos || []).some(p => safeUrl(p.image)) ? gallery(profile.homePhotos,'Professor Habib’s photographs','home') : '') + `
    <section class="profile-section">
      <aside class="profile-aside">${photo(profile.portrait,`Professor ${profile.name}`,'Professor’s portrait','portrait','50% 20%',true)}<p class="profile-role">${escape(profile.title)}<br>${escape(profile.department)}<br>${escape(profile.shortInstitution)}</p></aside>
      <div class="profile-text"><p class="eyebrow">${escape(profile.department)}</p><h1>Professor ${escape(profile.name)}</h1><p class="lead">${escape(profile.introduction)}</p>${paragraphs(profile.biography)}<div class="link-row">${link(`mailto:${profile.email}`,'Email Professor Habib','button')}${(profile.links||[]).map(l=>link(l.url,l.label)).join('')}</div></div>
    </section>${profile.portraitCredit ? `<p class="credit">Portrait: ${link(profile.portraitCreditUrl,profile.portraitCredit)}.</p>` : ''}`;
  const research = () => `<div class="research-grid">${(data.research||[]).map((r,i)=>`<article class="research-card">${photo(r.image,r.imageAlt||r.title,`Research photograph · ${r.title}`)}<div class="research-body"><p class="eyebrow">Research theme ${String(i+1).padStart(2,'0')}</p><h2>${escape(r.title)}</h2><p>${escape(r.description)}</p><ul class="tags">${(r.methods||[]).map(m=>`<li>${escape(m)}</li>`).join('')}</ul><div class="related-paper"><span class="small-label">Representative publication</span>${link(`https://doi.org/${r.doi}`,r.paper)}</div></div></article>`).join('')}</div><p class="editorial-note">${escape(profile.researchNote)}</p>`;
  const studentCard = (s) => {
    const date = s.status==='alumni' ? `Graduated: ${s.graduated||'Date to be added'}` : s.expectedGraduation ? `Expected graduation: ${s.expectedGraduation}` : s.joined ? `Joined: ${s.joined}` : 'Current PhD researcher';
    return `<article class="student-card">${photo(s.photo,s.name,`Portrait · ${s.name}`,'student-portrait')}<div class="student-info"><h3>${escape(s.name)}</h3><p class="degree-date">${escape(date)}</p><dl><div><dt>Thesis</dt><dd>${escape(s.thesis||'Thesis title to be added')}</dd></div><div><dt>Current affiliation</dt><dd>${escape(s.affiliation||'Affiliation to be added')}</dd></div></dl></div></article>`;
  };
  const group = () => ['current','alumni'].map(status=>{
    const people=(data.students||[]).filter(s=>s.status===status);
    return `<section class="people-section"><div class="section-line"><h2>${status==='current'?'Current PhD researchers':'PhD alumni'}</h2><span class="section-count">${people.length} researchers</span></div><div class="people-grid">${people.map(studentCard).join('')}</div></section>`;
  }).join('');
  const facilities = () => (data.facilities||[]).map((f,i)=>`<section class="facility-section"><div class="section-line"><div><p class="eyebrow">Facility ${String(i+1).padStart(2,'0')}</p><h2>${escape(f.title)}</h2></div><span class="section-count">${f.instruments.length} instruments</span></div><div class="facility-layout">${gallery(f.instruments,f.title)}<div class="instrument-directory"><h3>Instrumentation</h3><ul>${f.instruments.map((s,n)=>`<li><span class="instrument-index">${String(n+1).padStart(2,'0')}</span><span>${escape(s.name)}</span></li>`).join('')}</ul></div></div></section>`).join('') + '<p class="editorial-note">Inventory supplied by the research group. Contact the professor to discuss instrument availability and research access.</p>';
  const projects = () => `<div class="projects-grid">${(data.projects||[]).map((p,i)=>`<article class="project-card tone-${i%4}"><div class="funder-header">${logo(p.funderLogo,p.agency,p.funderAbbreviation)}<p>${escape(p.agency)}</p></div><div class="project-body"><span class="status-label">${escape(p.status||'Status to be added')}</span><h2>${escape(p.title)}</h2>${p.summary?`<p>${escape(p.summary)}</p>`:''}<div class="project-amount">${escape(p.amount||'Grant amount to be added')}</div><dl class="project-details"><div><dt>Role</dt><dd>${escape(p.role||'To be added')}</dd></div><div><dt>Duration</dt><dd>${escape(p.duration||'To be added')}</dd></div><div class="full"><dt>Project dates</dt><dd>${escape(p.start||p.end?`${p.start||'Start to be added'} – ${p.end||'End to be added'}`:'Dates to be added')}</dd></div><div class="full"><dt>Collaborators</dt><dd>${escape(p.collaborators||'To be added')}</dd></div></dl></div></article>`).join('')}</div><p class="editorial-note">${escape(profile.projectNote)}</p>`;
  const publications = () => {
    const papers=[...(data.publications||[])].sort((a,b)=>Number(b.year)-Number(a.year));
    const years=[...new Set(papers.map(p=>String(p.year)))];
    const labels={'journal-article':'Journal article','conference-abstract':'Conference abstract',preprint:'Preprint',correction:'Correction','book-chapter':'Book chapter','conference-paper':'Conference paper'};
    return `<div class="publication-intro"><p>${papers.length} works from ${link('https://orcid.org/0000-0003-3598-3548','Professor Habib’s public ORCID record')}, checked against the supplied CV where available. Snapshot: ${escape(profile.publicationSnapshot)}. This is not a claim of a complete bibliography. Years follow ORCID; preprints, abstracts and corrections are identified separately.</p><div class="link-row">${link('https://scholar.google.com/citations?user=O6iipQcAAAAJ&hl=en','Google Scholar')}${link('https://orcid.org/0000-0003-3598-3548','ORCID')}</div></div><nav class="year-links" aria-label="Publication years">${years.map(y=>link(`#year-${y}`,y)).join('')}</nav>${years.map(y=>`<section class="publication-year" id="year-${escape(y)}"><h2>${escape(y)}</h2><ol>${papers.filter(p=>String(p.year)===y).map(p=>`<li><article class="publication"><p class="eyebrow">${escape(labels[p.type]||p.type.replaceAll('-',' '))}</p><h3>${link(`https://doi.org/${p.doi}`,p.title,'publication-title')}</h3><p class="authors">${escape(p.authors)}</p><p class="journal">${escape(p.journal)} · ${escape(p.year)}</p>${link(`https://doi.org/${p.doi}`,p.doi,'doi')}</article></li>`).join('')}</ol></section>`).join('')}`;
  };
  const partnerships = () => `<div class="partners-grid">${(data.partners||[]).map((p,i)=>`<article class="partner-card tone-${i%4}">${logo(p.logo,p.name,p.abbreviation)}<p class="eyebrow">${escape(p.kind)}</p><h2>${escape(p.name)}</h2><p>${escape(p.description)}</p>${link(p.evidence,p.evidenceLabel||'Related research')}</article>`).join('')}</div><p class="editorial-note">These entries identify documented research collaborations and network participation. They do not assert formal institutional agreements or endorsements. Additional collaborators and supplied institutional logos can be added as confirmed.</p><section class="support-section"><h2>Research support</h2><p>Projects in the supplied CV acknowledge support from the Department of Science & Technology, the Ministry of Environment, Forest and Climate Change, state pollution control boards, Open Philanthropy and IIT Delhi.</p>${link('projects.html','Explore funded projects')}</section>`;
  const opportunities = () => `<div class="opportunity-grid">${(data.opportunities?.sections||[]).map(s=>`<section class="opportunity-panel"><h2>${escape(s.title)}</h2>${paragraphs(s.paragraphs)}${link(s.link,s.linkLabel,'button')}</section>`).join('')}</div>${data.opportunities?.notice?`<p class="notice">${escape(data.opportunities.notice)}</p>`:''}`;
  const renderers={index:home,research,group,facilities,projects,publications,partnerships,opportunities};
  const page = document.body.dataset.page;
  const contentKey = {group:'students',partnerships:'partners'}[page] || page;
  const hasData = Boolean(data.site && (page === 'index' || data[contentKey]));
  try {
    // Keep the complete HTML snapshot if a data file fails to load.
    if (hasData) target.innerHTML=(renderers[page] || home)();
  } catch(error) {
    if (!target.innerHTML.trim()) target.innerHTML='<p class="notice">This page could not load its content. Please contact the website maintainer.</p>';
    console.error('Content could not be rendered. Check the page’s data file.',error);
  }
  // Image mistakes fail gracefully: no broken-image icons or collapsed layout.
  document.querySelectorAll('.media img,.logo-slot img').forEach(img=>{
    const fallback=()=>{img.hidden=true;const sibling=img.nextElementSibling;if(sibling)sibling.hidden=false;};
    img.addEventListener('error',fallback);
    if(img.complete && img.naturalWidth===0)fallback();
  });
  // Motion respects reduced-motion preferences, pauses when focused, and stops in background tabs.
  const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
  document.querySelectorAll('[data-gallery]').forEach(root=>{
    const slides=[...root.querySelectorAll('[data-slide]')];
    if(slides.length<2)return;
    const play=root.querySelector('[data-play]');
    const count=root.querySelector('[data-count]');
    let index=0,timer=null,playing=root.dataset.autoplay==='true'&&!reducedMotion.matches;
    const show=(n)=>{index=(n+slides.length)%slides.length;slides.forEach((s,i)=>s.hidden=i!==index);count.textContent=`${index+1} / ${slides.length}`;};
    const stopTimer=()=>{if(timer){clearInterval(timer);timer=null;}};
    const update=()=>{
      stopTimer();
      if(play){play.textContent=playing?'Pause':'Play';play.setAttribute('aria-label',playing?'Pause slideshow':'Play slideshow');}
      count.setAttribute('aria-live',playing?'off':'polite');
      if(playing&&!document.hidden)timer=setInterval(()=>show(index+1),Math.max(3000,Number(profile.slideshowInterval)||6500));
    };
    const manual=(n)=>{playing=false;update();show(n);};
    root.querySelector('[data-prev]').addEventListener('click',()=>manual(index-1));
    root.querySelector('[data-next]').addEventListener('click',()=>manual(index+1));
    play?.addEventListener('click',()=>{playing=!playing;update();});
    root.addEventListener('focusin',()=>{playing=false;update();});
    root.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();manual(index+1);}if(e.key==='ArrowLeft'){e.preventDefault();manual(index-1);}});
    document.addEventListener('visibilitychange',update);
    reducedMotion.addEventListener('change',()=>{if(reducedMotion.matches){playing=false;update();}});
    update();
  });
})();
