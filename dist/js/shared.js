import { i, a as i$1, n, u, A, r, o } from './vendor.js';

const styles = i`@layer tcds{body{background-color:var(--tcds-color-theme-background);color:var(--tcds-color-theme-text-primary);font-family:var(--tcds-font-family-body);font-size:var(--tcds-font-size-md);font-variant-numeric:lining-nums;font-variant-ligatures:none;margin:0;padding:0;overflow-wrap:break-word;overflow-x:hidden}@media(prefers-contrast: no-preference),(prefers-contrast: less){body{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}}p{margin:1.5em 0}:where(ul,ol){margin-top:0;margin-left:4ch;padding:0}:where(ul ul,ul ol,ol ul,ol ol){margin-left:2ch}:where(:not(li)>:is(ul,ol):not(:last-child)){margin-bottom:1em}ul:where([role=list]),ol:where([role=list]){list-style:none;margin:0}:where(ol ol){list-style:upper-alpha}:where(ol ol ol){list-style:upper-roman}ol ::marker{font-family:var(--tcds-font-family-ui);font-weight:var(--tcds-font-weight-ui);color:rgba(0,0,0,.5);font-variant-numeric:lining-nums tabular-nums}:where(p,ol,ul,dl){line-height:var(--tcds-line-height-comfortable);color:inherit}:where(small,sub,sup){font-size:max(var(--tcds-font-size-xs),85%)}:where(sup){vertical-align:baseline;position:relative;top:-0.333lh}:where(a){color:var(--tcds-link-color);touch-action:manipulation;-webkit-tap-highlight-color:rgba(0,0,0,0)}:where(a:hover){color:var(--tcds-link-color-hover);text-decoration:none}:where(h1),:is(tcds-accordion,tcds-tabs) :where(h2){font:2.25rem/1.06 Fraunces,serif}@media(width >= 960px){:where(h1),:is(tcds-accordion,tcds-tabs) :where(h2){font:4.5rem/1.06 Fraunces,serif}}:where(h2),:is(tcds-accordion,tcds-tabs) :where(h3){font:1.5rem/1.33 Fraunces,serif}@media(width >= 960px){:where(h2),:is(tcds-accordion,tcds-tabs) :where(h3){font:3.75rem/1.06 Fraunces,serif}}:where(h3),:is(tcds-accordion,tcds-tabs) :where(h4){font:1.25rem/1.33 Fraunces,serif}@media(width >= 960px){:where(h3),:is(tcds-accordion,tcds-tabs) :where(h4){font:3rem/1.06 Fraunces,serif}}:where(h4),:is(tcds-accordion,tcds-tabs) :where(h5){font:1.125rem/1.33 Fraunces,serif}@media(width >= 960px){:where(h4),:is(tcds-accordion,tcds-tabs) :where(h5){font:2.25rem/1.33 Fraunces,serif}}:where(h1:not(:last-child)){margin-bottom:1em}:is(h2,h3,h4,h5,h6):where(:not(:first-child,[slot])){margin-top:2rem}:is(h2,h3,h4,h5,h6):where(:not(:last-child,[slot])){margin-bottom:2rem}:where(:not(h1,hr)+h2:not([slot])),:where(:not(h2,hr)+h3:not([slot])),:where(:not(h3,hr)+h4:not([slot])),:where(:not(h4,hr)+h5:not([slot])){margin-top:4rem}hr{border:none;border-top:1px solid var(--tcds-color-theme-edge);margin:1.5em 0}:where(audio,canvas,iframe,img,picture,svg,video){display:block;vertical-align:middle;max-width:100%}:where(:where(audio,canvas,iframe,img,picture,svg,video):not([height])){height:auto}:where(img,picture,svg,video){border:var(--tcds-media-border, 0);border-radius:var(--tcds-media-border-radius, 0);overflow:hidden}*{box-sizing:border-box}*::before,*::after{box-sizing:border-box}html{text-size-adjust:100%}@media(prefers-reduced-motion: no-preference){html{scroll-behavior:smooth}}[data-theme]{color:var(--tcds-color-theme-text-primary)}.tcds-icon,tcds-icon{display:inline-flex;vertical-align:middle;align-items:center}.tcds-icon::after,tcds-icon::after{content:"" !important;display:inline-block !important;height:1em !important;width:1em !important}.tcds-icon[preserve-color]::after,tcds-icon[preserve-color]::after{background-image:var(--tcds-icon) !important}.tcds-icon:not([preserve-color])::after,tcds-icon:not([preserve-color])::after{background:currentcolor !important;mask:var(--tcds-icon) no-repeat center !important}.bg-icon{position:relative;overflow:hidden;z-index:1}.bg-icon::before{content:"";display:block;position:absolute;top:0;left:0;width:100%;height:100%;background-color:var(--tcds-color-theme-faded);mask-image:var(--tcds-icon);mask-position:-15% center;mask-repeat:no-repeat;mask-size:200%;z-index:-1}@media(width >= 1312px){.bg-icon::before{mask-position:200% center;mask-size:85%}}.tcds-icon--facebook,.tcds-icon--facebook--brand,.bg-icon--facebook,.bg-icon--facebook--brand,tcds-icon[icon~=facebook],tcds-icon[icon~=facebook][category~=brand]{--tcds-icon: var(--tcds-icon-brand-facebook)}.tcds-icon--instagram,.tcds-icon--instagram--brand,.bg-icon--instagram,.bg-icon--instagram--brand,tcds-icon[icon~=instagram],tcds-icon[icon~=instagram][category~=brand]{--tcds-icon: var(--tcds-icon-brand-instagram)}.tcds-icon--mychart,.tcds-icon--mychart--brand,.bg-icon--mychart,.bg-icon--mychart--brand,tcds-icon[icon~=mychart],tcds-icon[icon~=mychart][category~=brand]{--tcds-icon: var(--tcds-icon-brand-mychart)}.tcds-icon--texans,.tcds-icon--texans--brand,.bg-icon--texans,.bg-icon--texans--brand,tcds-icon[icon~=texans],tcds-icon[icon~=texans][category~=brand]{--tcds-icon: var(--tcds-icon-brand-texans)}.tcds-icon--texas-childrens,.tcds-icon--texas-childrens--brand,.bg-icon--texas-childrens,.bg-icon--texas-childrens--brand,tcds-icon[icon~=texas-childrens],tcds-icon[icon~=texas-childrens][category~=brand]{--tcds-icon: var(--tcds-icon-brand-texas-childrens)}.tcds-icon--twitter,.tcds-icon--twitter--brand,.bg-icon--twitter,.bg-icon--twitter--brand,tcds-icon[icon~=twitter],tcds-icon[icon~=twitter][category~=brand]{--tcds-icon: var(--tcds-icon-brand-twitter)}.tcds-icon--youtube,.tcds-icon--youtube--brand,.bg-icon--youtube,.bg-icon--youtube--brand,tcds-icon[icon~=youtube],tcds-icon[icon~=youtube][category~=brand]{--tcds-icon: var(--tcds-icon-brand-youtube)}.tcds-icon--advocate,.tcds-icon--advocate--duotone,.bg-icon--advocate,.bg-icon--advocate--duotone,tcds-icon[icon~=advocate],tcds-icon[icon~=advocate][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-advocate)}.tcds-icon--areas-of-research,.tcds-icon--areas-of-research--duotone,.bg-icon--areas-of-research,.bg-icon--areas-of-research--duotone,tcds-icon[icon~=areas-of-research],tcds-icon[icon~=areas-of-research][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-areas-of-research)}.tcds-icon--baby-boy,.tcds-icon--baby-boy--duotone,.bg-icon--baby-boy,.bg-icon--baby-boy--duotone,tcds-icon[icon~=baby-boy],tcds-icon[icon~=baby-boy][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-baby-boy)}.tcds-icon--baby-hands,.tcds-icon--baby-hands--duotone,.bg-icon--baby-hands,.bg-icon--baby-hands--duotone,tcds-icon[icon~=baby-hands],tcds-icon[icon~=baby-hands][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-baby-hands)}.tcds-icon--baby-stork,.tcds-icon--baby-stork--duotone,.bg-icon--baby-stork,.bg-icon--baby-stork--duotone,tcds-icon[icon~=baby-stork],tcds-icon[icon~=baby-stork][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-baby-stork)}.tcds-icon--badge-heart,.tcds-icon--badge-heart--duotone,.bg-icon--badge-heart,.bg-icon--badge-heart--duotone,tcds-icon[icon~=badge-heart],tcds-icon[icon~=badge-heart][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-badge-heart)}.tcds-icon--caduceus,.tcds-icon--caduceus--duotone,.bg-icon--caduceus,.bg-icon--caduceus--duotone,tcds-icon[icon~=caduceus],tcds-icon[icon~=caduceus][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-caduceus)}.tcds-icon--calendar-edit,.tcds-icon--calendar-edit--duotone,.bg-icon--calendar-edit,.bg-icon--calendar-edit--duotone,tcds-icon[icon~=calendar-edit],tcds-icon[icon~=calendar-edit][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-calendar-edit)}.tcds-icon--calendar-star,.tcds-icon--calendar-star--duotone,.bg-icon--calendar-star,.bg-icon--calendar-star--duotone,tcds-icon[icon~=calendar-star],tcds-icon[icon~=calendar-star][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-calendar-star)}.tcds-icon--chat-people,.tcds-icon--chat-people--duotone,.bg-icon--chat-people,.bg-icon--chat-people--duotone,tcds-icon[icon~=chat-people],tcds-icon[icon~=chat-people][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-chat-people)}.tcds-icon--earth-star,.tcds-icon--earth-star--duotone,.bg-icon--earth-star,.bg-icon--earth-star--duotone,tcds-icon[icon~=earth-star],tcds-icon[icon~=earth-star][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-earth-star)}.tcds-icon--earth,.tcds-icon--earth--duotone,.bg-icon--earth,.bg-icon--earth--duotone,tcds-icon[icon~=earth],tcds-icon[icon~=earth][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-earth)}.tcds-icon--family-add-member,.tcds-icon--family-add-member--duotone,.bg-icon--family-add-member,.bg-icon--family-add-member--duotone,tcds-icon[icon~=family-add-member],tcds-icon[icon~=family-add-member][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-family-add-member)}.tcds-icon--find-clinical-trials,.tcds-icon--find-clinical-trials--duotone,.bg-icon--find-clinical-trials,.bg-icon--find-clinical-trials--duotone,tcds-icon[icon~=find-clinical-trials],tcds-icon[icon~=find-clinical-trials][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-find-clinical-trials)}.tcds-icon--first-aid,.tcds-icon--first-aid--duotone,.bg-icon--first-aid,.bg-icon--first-aid--duotone,tcds-icon[icon~=first-aid],tcds-icon[icon~=first-aid][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-first-aid)}.tcds-icon--flask,.tcds-icon--flask--duotone,.bg-icon--flask,.bg-icon--flask--duotone,tcds-icon[icon~=flask],tcds-icon[icon~=flask][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-flask)}.tcds-icon--giving,.tcds-icon--giving--duotone,.bg-icon--giving,.bg-icon--giving--duotone,tcds-icon[icon~=giving],tcds-icon[icon~=giving][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-giving)}.tcds-icon--hands-heart,.tcds-icon--hands-heart--duotone,.bg-icon--hands-heart,.bg-icon--hands-heart--duotone,tcds-icon[icon~=hands-heart],tcds-icon[icon~=hands-heart][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-hands-heart)}.tcds-icon--heartbeat,.tcds-icon--heartbeat--duotone,.bg-icon--heartbeat,.bg-icon--heartbeat--duotone,tcds-icon[icon~=heartbeat],tcds-icon[icon~=heartbeat][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-heartbeat)}.tcds-icon--laptop-check,.tcds-icon--laptop-check--duotone,.bg-icon--laptop-check,.bg-icon--laptop-check--duotone,tcds-icon[icon~=laptop-check],tcds-icon[icon~=laptop-check][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-laptop-check)}.tcds-icon--laptop-heart,.tcds-icon--laptop-heart--duotone,.bg-icon--laptop-heart,.bg-icon--laptop-heart--duotone,tcds-icon[icon~=laptop-heart],tcds-icon[icon~=laptop-heart][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-laptop-heart)}.tcds-icon--laptop-plus,.tcds-icon--laptop-plus--duotone,.bg-icon--laptop-plus,.bg-icon--laptop-plus--duotone,tcds-icon[icon~=laptop-plus],tcds-icon[icon~=laptop-plus][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-laptop-plus)}.tcds-icon--like-plus,.tcds-icon--like-plus--duotone,.bg-icon--like-plus,.bg-icon--like-plus--duotone,tcds-icon[icon~=like-plus],tcds-icon[icon~=like-plus][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-like-plus)}.tcds-icon--location-pin-1,.tcds-icon--location-pin-1--duotone,.bg-icon--location-pin-1,.bg-icon--location-pin-1--duotone,tcds-icon[icon~=location-pin-1],tcds-icon[icon~=location-pin-1][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-location-pin-1)}.tcds-icon--location-pin-plus,.tcds-icon--location-pin-plus--duotone,.bg-icon--location-pin-plus,.bg-icon--location-pin-plus--duotone,tcds-icon[icon~=location-pin-plus],tcds-icon[icon~=location-pin-plus][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-location-pin-plus)}.tcds-icon--map-search,.tcds-icon--map-search--duotone,.bg-icon--map-search,.bg-icon--map-search--duotone,tcds-icon[icon~=map-search],tcds-icon[icon~=map-search][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-map-search)}.tcds-icon--person-woman,.tcds-icon--person-woman--duotone,.bg-icon--person-woman,.bg-icon--person-woman--duotone,tcds-icon[icon~=person-woman],tcds-icon[icon~=person-woman][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-person-woman)}.tcds-icon--personnel-doctor-man-plus,.tcds-icon--personnel-doctor-man-plus--duotone,.bg-icon--personnel-doctor-man-plus,.bg-icon--personnel-doctor-man-plus--duotone,tcds-icon[icon~=personnel-doctor-man-plus],tcds-icon[icon~=personnel-doctor-man-plus][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-personnel-doctor-man-plus)}.tcds-icon--personnel-man-plus,.tcds-icon--personnel-man-plus--duotone,.bg-icon--personnel-man-plus,.bg-icon--personnel-man-plus--duotone,tcds-icon[icon~=personnel-man-plus],tcds-icon[icon~=personnel-man-plus][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-personnel-man-plus)}.tcds-icon--personnel-nurse-plus,.tcds-icon--personnel-nurse-plus--duotone,.bg-icon--personnel-nurse-plus,.bg-icon--personnel-nurse-plus--duotone,tcds-icon[icon~=personnel-nurse-plus],tcds-icon[icon~=personnel-nurse-plus][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-personnel-nurse-plus)}.tcds-icon--professions-doctor-man,.tcds-icon--professions-doctor-man--duotone,.bg-icon--professions-doctor-man,.bg-icon--professions-doctor-man--duotone,tcds-icon[icon~=professions-doctor-man],tcds-icon[icon~=professions-doctor-man][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-professions-doctor-man)}.tcds-icon--professions-doctor-woman,.tcds-icon--professions-doctor-woman--duotone,.bg-icon--professions-doctor-woman,.bg-icon--professions-doctor-woman--duotone,tcds-icon[icon~=professions-doctor-woman],tcds-icon[icon~=professions-doctor-woman][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-professions-doctor-woman)}.tcds-icon--search-man,.tcds-icon--search-man--duotone,.bg-icon--search-man,.bg-icon--search-man--duotone,tcds-icon[icon~=search-man],tcds-icon[icon~=search-man][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-search-man)}.tcds-icon--search-square,.tcds-icon--search-square--duotone,.bg-icon--search-square,.bg-icon--search-square--duotone,tcds-icon[icon~=search-square],tcds-icon[icon~=search-square][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-search-square)}.tcds-icon--search-woman,.tcds-icon--search-woman--duotone,.bg-icon--search-woman,.bg-icon--search-woman--duotone,tcds-icon[icon~=search-woman],tcds-icon[icon~=search-woman][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-search-woman)}.tcds-icon--search,.tcds-icon--search--duotone,.bg-icon--search,.bg-icon--search--duotone,tcds-icon[icon~=search],tcds-icon[icon~=search][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-search)}.tcds-icon--sections,.tcds-icon--sections--duotone,.bg-icon--sections,.bg-icon--sections--duotone,tcds-icon[icon~=sections],tcds-icon[icon~=sections][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-sections)}.tcds-icon--tablet-hand-plus,.tcds-icon--tablet-hand-plus--duotone,.bg-icon--tablet-hand-plus,.bg-icon--tablet-hand-plus--duotone,tcds-icon[icon~=tablet-hand-plus],tcds-icon[icon~=tablet-hand-plus][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-tablet-hand-plus)}.tcds-icon--test-tubes,.tcds-icon--test-tubes--duotone,.bg-icon--test-tubes,.bg-icon--test-tubes--duotone,tcds-icon[icon~=test-tubes],tcds-icon[icon~=test-tubes][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-test-tubes)}.tcds-icon--todo-check,.tcds-icon--todo-check--duotone,.bg-icon--todo-check,.bg-icon--todo-check--duotone,tcds-icon[icon~=todo-check],tcds-icon[icon~=todo-check][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-todo-check)}.tcds-icon--todo-heart,.tcds-icon--todo-heart--duotone,.bg-icon--todo-heart,.bg-icon--todo-heart--duotone,tcds-icon[icon~=todo-heart],tcds-icon[icon~=todo-heart][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-todo-heart)}.tcds-icon--trolley-woman,.tcds-icon--trolley-woman--duotone,.bg-icon--trolley-woman,.bg-icon--trolley-woman--duotone,tcds-icon[icon~=trolley-woman],tcds-icon[icon~=trolley-woman][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-trolley-woman)}.tcds-icon--trolley,.tcds-icon--trolley--duotone,.bg-icon--trolley,.bg-icon--trolley--duotone,tcds-icon[icon~=trolley],tcds-icon[icon~=trolley][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-trolley)}.tcds-icon--vegetable-apple,.tcds-icon--vegetable-apple--duotone,.bg-icon--vegetable-apple,.bg-icon--vegetable-apple--duotone,tcds-icon[icon~=vegetable-apple],tcds-icon[icon~=vegetable-apple][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-vegetable-apple)}.tcds-icon--vegetable-beet,.tcds-icon--vegetable-beet--duotone,.bg-icon--vegetable-beet,.bg-icon--vegetable-beet--duotone,tcds-icon[icon~=vegetable-beet],tcds-icon[icon~=vegetable-beet][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-vegetable-beet)}.tcds-icon--virtual-meeting-man,.tcds-icon--virtual-meeting-man--duotone,.bg-icon--virtual-meeting-man,.bg-icon--virtual-meeting-man--duotone,tcds-icon[icon~=virtual-meeting-man],tcds-icon[icon~=virtual-meeting-man][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-virtual-meeting-man)}.tcds-icon--world-laboratories,.tcds-icon--world-laboratories--duotone,.bg-icon--world-laboratories,.bg-icon--world-laboratories--duotone,tcds-icon[icon~=world-laboratories],tcds-icon[icon~=world-laboratories][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-world-laboratories)}.tcds-icon--ambulance,.tcds-icon--ambulance--primary,.bg-icon--ambulance,.bg-icon--ambulance--primary,tcds-icon[icon~=ambulance],tcds-icon[icon~=ambulance][category~=primary]{--tcds-icon: var(--tcds-icon-primary-ambulance)}.tcds-icon--annual-checkup,.tcds-icon--annual-checkup--primary,.bg-icon--annual-checkup,.bg-icon--annual-checkup--primary,tcds-icon[icon~=annual-checkup],tcds-icon[icon~=annual-checkup][category~=primary]{--tcds-icon: var(--tcds-icon-primary-annual-checkup)}.tcds-icon--appointment,.tcds-icon--appointment--primary,.bg-icon--appointment,.bg-icon--appointment--primary,tcds-icon[icon~=appointment],tcds-icon[icon~=appointment][category~=primary]{--tcds-icon: var(--tcds-icon-primary-appointment)}.tcds-icon--ask-a-doctor,.tcds-icon--ask-a-doctor--primary,.bg-icon--ask-a-doctor,.bg-icon--ask-a-doctor--primary,tcds-icon[icon~=ask-a-doctor],tcds-icon[icon~=ask-a-doctor][category~=primary]{--tcds-icon: var(--tcds-icon-primary-ask-a-doctor)}.tcds-icon--blood-pressure,.tcds-icon--blood-pressure--primary,.bg-icon--blood-pressure,.bg-icon--blood-pressure--primary,tcds-icon[icon~=blood-pressure],tcds-icon[icon~=blood-pressure][category~=primary]{--tcds-icon: var(--tcds-icon-primary-blood-pressure)}.tcds-icon--blood-test,.tcds-icon--blood-test--primary,.bg-icon--blood-test,.bg-icon--blood-test--primary,tcds-icon[icon~=blood-test],tcds-icon[icon~=blood-test][category~=primary]{--tcds-icon: var(--tcds-icon-primary-blood-test)}.tcds-icon--bone-density-scan,.tcds-icon--bone-density-scan--primary,.bg-icon--bone-density-scan,.bg-icon--bone-density-scan--primary,tcds-icon[icon~=bone-density-scan],tcds-icon[icon~=bone-density-scan][category~=primary]{--tcds-icon: var(--tcds-icon-primary-bone-density-scan)}.tcds-icon--caduceus,.tcds-icon--caduceus--primary,.bg-icon--caduceus,.bg-icon--caduceus--primary,tcds-icon[icon~=caduceus],tcds-icon[icon~=caduceus][category~=primary]{--tcds-icon: var(--tcds-icon-primary-caduceus)}.tcds-icon--cardiac-dspect,.tcds-icon--cardiac-dspect--primary,.bg-icon--cardiac-dspect,.bg-icon--cardiac-dspect--primary,tcds-icon[icon~=cardiac-dspect],tcds-icon[icon~=cardiac-dspect][category~=primary]{--tcds-icon: var(--tcds-icon-primary-cardiac-dspect)}.tcds-icon--cardiac-pet-perfusion,.tcds-icon--cardiac-pet-perfusion--primary,.bg-icon--cardiac-pet-perfusion,.bg-icon--cardiac-pet-perfusion--primary,tcds-icon[icon~=cardiac-pet-perfusion],tcds-icon[icon~=cardiac-pet-perfusion][category~=primary]{--tcds-icon: var(--tcds-icon-primary-cardiac-pet-perfusion)}.tcds-icon--crutches,.tcds-icon--crutches--primary,.bg-icon--crutches,.bg-icon--crutches--primary,tcds-icon[icon~=crutches],tcds-icon[icon~=crutches][category~=primary]{--tcds-icon: var(--tcds-icon-primary-crutches)}.tcds-icon--diagnosis,.tcds-icon--diagnosis--primary,.bg-icon--diagnosis,.bg-icon--diagnosis--primary,tcds-icon[icon~=diagnosis],tcds-icon[icon~=diagnosis][category~=primary]{--tcds-icon: var(--tcds-icon-primary-diagnosis)}.tcds-icon--doctor,.tcds-icon--doctor--primary,.bg-icon--doctor,.bg-icon--doctor--primary,tcds-icon[icon~=doctor],tcds-icon[icon~=doctor][category~=primary]{--tcds-icon: var(--tcds-icon-primary-doctor)}.tcds-icon--electrocardiogram,.tcds-icon--electrocardiogram--primary,.bg-icon--electrocardiogram,.bg-icon--electrocardiogram--primary,tcds-icon[icon~=electrocardiogram],tcds-icon[icon~=electrocardiogram][category~=primary]{--tcds-icon: var(--tcds-icon-primary-electrocardiogram)}.tcds-icon--endoscope,.tcds-icon--endoscope--primary,.bg-icon--endoscope,.bg-icon--endoscope--primary,tcds-icon[icon~=endoscope],tcds-icon[icon~=endoscope][category~=primary]{--tcds-icon: var(--tcds-icon-primary-endoscope)}.tcds-icon--eye-test,.tcds-icon--eye-test--primary,.bg-icon--eye-test,.bg-icon--eye-test--primary,tcds-icon[icon~=eye-test],tcds-icon[icon~=eye-test][category~=primary]{--tcds-icon: var(--tcds-icon-primary-eye-test)}.tcds-icon--first-aid,.tcds-icon--first-aid--primary,.bg-icon--first-aid,.bg-icon--first-aid--primary,tcds-icon[icon~=first-aid],tcds-icon[icon~=first-aid][category~=primary]{--tcds-icon: var(--tcds-icon-primary-first-aid)}.tcds-icon--fluoroscopy,.tcds-icon--fluoroscopy--primary,.bg-icon--fluoroscopy,.bg-icon--fluoroscopy--primary,tcds-icon[icon~=fluoroscopy],tcds-icon[icon~=fluoroscopy][category~=primary]{--tcds-icon: var(--tcds-icon-primary-fluoroscopy)}.tcds-icon--heartbeat,.tcds-icon--heartbeat--primary,.bg-icon--heartbeat,.bg-icon--heartbeat--primary,tcds-icon[icon~=heartbeat],tcds-icon[icon~=heartbeat][category~=primary]{--tcds-icon: var(--tcds-icon-primary-heartbeat)}.tcds-icon--helicopter,.tcds-icon--helicopter--primary,.bg-icon--helicopter,.bg-icon--helicopter--primary,tcds-icon[icon~=helicopter],tcds-icon[icon~=helicopter][category~=primary]{--tcds-icon: var(--tcds-icon-primary-helicopter)}.tcds-icon--hospital,.tcds-icon--hospital--primary,.bg-icon--hospital,.bg-icon--hospital--primary,tcds-icon[icon~=hospital],tcds-icon[icon~=hospital][category~=primary]{--tcds-icon: var(--tcds-icon-primary-hospital)}.tcds-icon--infections,.tcds-icon--infections--primary,.bg-icon--infections,.bg-icon--infections--primary,tcds-icon[icon~=infections],tcds-icon[icon~=infections][category~=primary]{--tcds-icon: var(--tcds-icon-primary-infections)}.tcds-icon--infusion,.tcds-icon--infusion--primary,.bg-icon--infusion,.bg-icon--infusion--primary,tcds-icon[icon~=infusion],tcds-icon[icon~=infusion][category~=primary]{--tcds-icon: var(--tcds-icon-primary-infusion)}.tcds-icon--injection,.tcds-icon--injection--primary,.bg-icon--injection,.bg-icon--injection--primary,tcds-icon[icon~=injection],tcds-icon[icon~=injection][category~=primary]{--tcds-icon: var(--tcds-icon-primary-injection)}.tcds-icon--lab-analysis,.tcds-icon--lab-analysis--primary,.bg-icon--lab-analysis,.bg-icon--lab-analysis--primary,tcds-icon[icon~=lab-analysis],tcds-icon[icon~=lab-analysis][category~=primary]{--tcds-icon: var(--tcds-icon-primary-lab-analysis)}.tcds-icon--location-pin-1,.tcds-icon--location-pin-1--primary,.bg-icon--location-pin-1,.bg-icon--location-pin-1--primary,tcds-icon[icon~=location-pin-1],tcds-icon[icon~=location-pin-1][category~=primary]{--tcds-icon: var(--tcds-icon-primary-location-pin-1)}.tcds-icon--location-pin-2,.tcds-icon--location-pin-2--primary,.bg-icon--location-pin-2,.bg-icon--location-pin-2--primary,tcds-icon[icon~=location-pin-2],tcds-icon[icon~=location-pin-2][category~=primary]{--tcds-icon: var(--tcds-icon-primary-location-pin-2)}.tcds-icon--loved-one,.tcds-icon--loved-one--primary,.bg-icon--loved-one,.bg-icon--loved-one--primary,tcds-icon[icon~=loved-one],tcds-icon[icon~=loved-one][category~=primary]{--tcds-icon: var(--tcds-icon-primary-loved-one)}.tcds-icon--mammogram,.tcds-icon--mammogram--primary,.bg-icon--mammogram,.bg-icon--mammogram--primary,tcds-icon[icon~=mammogram],tcds-icon[icon~=mammogram][category~=primary]{--tcds-icon: var(--tcds-icon-primary-mammogram)}.tcds-icon--medical-records,.tcds-icon--medical-records--primary,.bg-icon--medical-records,.bg-icon--medical-records--primary,tcds-icon[icon~=medical-records],tcds-icon[icon~=medical-records][category~=primary]{--tcds-icon: var(--tcds-icon-primary-medical-records)}.tcds-icon--medical-support,.tcds-icon--medical-support--primary,.bg-icon--medical-support,.bg-icon--medical-support--primary,tcds-icon[icon~=medical-support],tcds-icon[icon~=medical-support][category~=primary]{--tcds-icon: var(--tcds-icon-primary-medical-support)}.tcds-icon--medical-treatment,.tcds-icon--medical-treatment--primary,.bg-icon--medical-treatment,.bg-icon--medical-treatment--primary,tcds-icon[icon~=medical-treatment],tcds-icon[icon~=medical-treatment][category~=primary]{--tcds-icon: var(--tcds-icon-primary-medical-treatment)}.tcds-icon--medicine-pills,.tcds-icon--medicine-pills--primary,.bg-icon--medicine-pills,.bg-icon--medicine-pills--primary,tcds-icon[icon~=medicine-pills],tcds-icon[icon~=medicine-pills][category~=primary]{--tcds-icon: var(--tcds-icon-primary-medicine-pills)}.tcds-icon--mental-health,.tcds-icon--mental-health--primary,.bg-icon--mental-health,.bg-icon--mental-health--primary,tcds-icon[icon~=mental-health],tcds-icon[icon~=mental-health][category~=primary]{--tcds-icon: var(--tcds-icon-primary-mental-health)}.tcds-icon--mobile-app-healthcare,.tcds-icon--mobile-app-healthcare--primary,.bg-icon--mobile-app-healthcare,.bg-icon--mobile-app-healthcare--primary,tcds-icon[icon~=mobile-app-healthcare],tcds-icon[icon~=mobile-app-healthcare][category~=primary]{--tcds-icon: var(--tcds-icon-primary-mobile-app-healthcare)}.tcds-icon--mobile-healthcare,.tcds-icon--mobile-healthcare--primary,.bg-icon--mobile-healthcare,.bg-icon--mobile-healthcare--primary,tcds-icon[icon~=mobile-healthcare],tcds-icon[icon~=mobile-healthcare][category~=primary]{--tcds-icon: var(--tcds-icon-primary-mobile-healthcare)}.tcds-icon--mobile-phone,.tcds-icon--mobile-phone--primary,.bg-icon--mobile-phone,.bg-icon--mobile-phone--primary,tcds-icon[icon~=mobile-phone],tcds-icon[icon~=mobile-phone][category~=primary]{--tcds-icon: var(--tcds-icon-primary-mobile-phone)}.tcds-icon--mri-1,.tcds-icon--mri-1--primary,.bg-icon--mri-1,.bg-icon--mri-1--primary,tcds-icon[icon~=mri-1],tcds-icon[icon~=mri-1][category~=primary]{--tcds-icon: var(--tcds-icon-primary-mri-1)}.tcds-icon--mri-2,.tcds-icon--mri-2--primary,.bg-icon--mri-2,.bg-icon--mri-2--primary,tcds-icon[icon~=mri-2],tcds-icon[icon~=mri-2][category~=primary]{--tcds-icon: var(--tcds-icon-primary-mri-2)}.tcds-icon--mri-3,.tcds-icon--mri-3--primary,.bg-icon--mri-3,.bg-icon--mri-3--primary,tcds-icon[icon~=mri-3],tcds-icon[icon~=mri-3][category~=primary]{--tcds-icon: var(--tcds-icon-primary-mri-3)}.tcds-icon--mri-4-contrast,.tcds-icon--mri-4-contrast--primary,.bg-icon--mri-4-contrast,.bg-icon--mri-4-contrast--primary,tcds-icon[icon~=mri-4-contrast],tcds-icon[icon~=mri-4-contrast][category~=primary]{--tcds-icon: var(--tcds-icon-primary-mri-4-contrast)}.tcds-icon--mri-4,.tcds-icon--mri-4--primary,.bg-icon--mri-4,.bg-icon--mri-4--primary,tcds-icon[icon~=mri-4],tcds-icon[icon~=mri-4][category~=primary]{--tcds-icon: var(--tcds-icon-primary-mri-4)}.tcds-icon--neurology,.tcds-icon--neurology--primary,.bg-icon--neurology,.bg-icon--neurology--primary,tcds-icon[icon~=neurology],tcds-icon[icon~=neurology][category~=primary]{--tcds-icon: var(--tcds-icon-primary-neurology)}.tcds-icon--nurse,.tcds-icon--nurse--primary,.bg-icon--nurse,.bg-icon--nurse--primary,tcds-icon[icon~=nurse],tcds-icon[icon~=nurse][category~=primary]{--tcds-icon: var(--tcds-icon-primary-nurse)}.tcds-icon--online-diagnosis,.tcds-icon--online-diagnosis--primary,.bg-icon--online-diagnosis,.bg-icon--online-diagnosis--primary,tcds-icon[icon~=online-diagnosis],tcds-icon[icon~=online-diagnosis][category~=primary]{--tcds-icon: var(--tcds-icon-primary-online-diagnosis)}.tcds-icon--organ-donation,.tcds-icon--organ-donation--primary,.bg-icon--organ-donation,.bg-icon--organ-donation--primary,tcds-icon[icon~=organ-donation],tcds-icon[icon~=organ-donation][category~=primary]{--tcds-icon: var(--tcds-icon-primary-organ-donation)}.tcds-icon--ovaries,.tcds-icon--ovaries--primary,.bg-icon--ovaries,.bg-icon--ovaries--primary,tcds-icon[icon~=ovaries],tcds-icon[icon~=ovaries][category~=primary]{--tcds-icon: var(--tcds-icon-primary-ovaries)}.tcds-icon--patient-care,.tcds-icon--patient-care--primary,.bg-icon--patient-care,.bg-icon--patient-care--primary,tcds-icon[icon~=patient-care],tcds-icon[icon~=patient-care][category~=primary]{--tcds-icon: var(--tcds-icon-primary-patient-care)}.tcds-icon--physical-exam,.tcds-icon--physical-exam--primary,.bg-icon--physical-exam,.bg-icon--physical-exam--primary,tcds-icon[icon~=physical-exam],tcds-icon[icon~=physical-exam][category~=primary]{--tcds-icon: var(--tcds-icon-primary-physical-exam)}.tcds-icon--provider,.tcds-icon--provider--primary,.bg-icon--provider,.bg-icon--provider--primary,tcds-icon[icon~=provider],tcds-icon[icon~=provider][category~=primary]{--tcds-icon: var(--tcds-icon-primary-provider)}.tcds-icon--radiation,.tcds-icon--radiation--primary,.bg-icon--radiation,.bg-icon--radiation--primary,tcds-icon[icon~=radiation],tcds-icon[icon~=radiation][category~=primary]{--tcds-icon: var(--tcds-icon-primary-radiation)}.tcds-icon--radiology,.tcds-icon--radiology--primary,.bg-icon--radiology,.bg-icon--radiology--primary,tcds-icon[icon~=radiology],tcds-icon[icon~=radiology][category~=primary]{--tcds-icon: var(--tcds-icon-primary-radiology)}.tcds-icon--schedule,.tcds-icon--schedule--primary,.bg-icon--schedule,.bg-icon--schedule--primary,tcds-icon[icon~=schedule],tcds-icon[icon~=schedule][category~=primary]{--tcds-icon: var(--tcds-icon-primary-schedule)}.tcds-icon--search-heart,.tcds-icon--search-heart--primary,.bg-icon--search-heart,.bg-icon--search-heart--primary,tcds-icon[icon~=search-heart],tcds-icon[icon~=search-heart][category~=primary]{--tcds-icon: var(--tcds-icon-primary-search-heart)}.tcds-icon--service,.tcds-icon--service--primary,.bg-icon--service,.bg-icon--service--primary,tcds-icon[icon~=service],tcds-icon[icon~=service][category~=primary]{--tcds-icon: var(--tcds-icon-primary-service)}.tcds-icon--sexology,.tcds-icon--sexology--primary,.bg-icon--sexology,.bg-icon--sexology--primary,tcds-icon[icon~=sexology],tcds-icon[icon~=sexology][category~=primary]{--tcds-icon: var(--tcds-icon-primary-sexology)}.tcds-icon--stethoscope,.tcds-icon--stethoscope--primary,.bg-icon--stethoscope,.bg-icon--stethoscope--primary,tcds-icon[icon~=stethoscope],tcds-icon[icon~=stethoscope][category~=primary]{--tcds-icon: var(--tcds-icon-primary-stethoscope)}.tcds-icon--stretcher,.tcds-icon--stretcher--primary,.bg-icon--stretcher,.bg-icon--stretcher--primary,tcds-icon[icon~=stretcher],tcds-icon[icon~=stretcher][category~=primary]{--tcds-icon: var(--tcds-icon-primary-stretcher)}.tcds-icon--surgery,.tcds-icon--surgery--primary,.bg-icon--surgery,.bg-icon--surgery--primary,tcds-icon[icon~=surgery],tcds-icon[icon~=surgery][category~=primary]{--tcds-icon: var(--tcds-icon-primary-surgery)}.tcds-icon--ultrasound-1,.tcds-icon--ultrasound-1--primary,.bg-icon--ultrasound-1,.bg-icon--ultrasound-1--primary,tcds-icon[icon~=ultrasound-1],tcds-icon[icon~=ultrasound-1][category~=primary]{--tcds-icon: var(--tcds-icon-primary-ultrasound-1)}.tcds-icon--ultrasound-2,.tcds-icon--ultrasound-2--primary,.bg-icon--ultrasound-2,.bg-icon--ultrasound-2--primary,tcds-icon[icon~=ultrasound-2],tcds-icon[icon~=ultrasound-2][category~=primary]{--tcds-icon: var(--tcds-icon-primary-ultrasound-2)}.tcds-icon--virtual-care,.tcds-icon--virtual-care--primary,.bg-icon--virtual-care,.bg-icon--virtual-care--primary,tcds-icon[icon~=virtual-care],tcds-icon[icon~=virtual-care][category~=primary]{--tcds-icon: var(--tcds-icon-primary-virtual-care)}.tcds-icon--wheelchair,.tcds-icon--wheelchair--primary,.bg-icon--wheelchair,.bg-icon--wheelchair--primary,tcds-icon[icon~=wheelchair],tcds-icon[icon~=wheelchair][category~=primary]{--tcds-icon: var(--tcds-icon-primary-wheelchair)}.tcds-icon--x-ray-bone,.tcds-icon--x-ray-bone--primary,.bg-icon--x-ray-bone,.bg-icon--x-ray-bone--primary,tcds-icon[icon~=x-ray-bone],tcds-icon[icon~=x-ray-bone][category~=primary]{--tcds-icon: var(--tcds-icon-primary-x-ray-bone)}.tcds-icon--x-ray-examination,.tcds-icon--x-ray-examination--primary,.bg-icon--x-ray-examination,.bg-icon--x-ray-examination--primary,tcds-icon[icon~=x-ray-examination],tcds-icon[icon~=x-ray-examination][category~=primary]{--tcds-icon: var(--tcds-icon-primary-x-ray-examination)}.tcds-icon--x-ray-machine,.tcds-icon--x-ray-machine--primary,.bg-icon--x-ray-machine,.bg-icon--x-ray-machine--primary,tcds-icon[icon~=x-ray-machine],tcds-icon[icon~=x-ray-machine][category~=primary]{--tcds-icon: var(--tcds-icon-primary-x-ray-machine)}.tcds-icon--x-ray-skull,.tcds-icon--x-ray-skull--primary,.bg-icon--x-ray-skull,.bg-icon--x-ray-skull--primary,tcds-icon[icon~=x-ray-skull],tcds-icon[icon~=x-ray-skull][category~=primary]{--tcds-icon: var(--tcds-icon-primary-x-ray-skull)}.tcds-icon--x-ray-tooth,.tcds-icon--x-ray-tooth--primary,.bg-icon--x-ray-tooth,.bg-icon--x-ray-tooth--primary,tcds-icon[icon~=x-ray-tooth],tcds-icon[icon~=x-ray-tooth][category~=primary]{--tcds-icon: var(--tcds-icon-primary-x-ray-tooth)}.tcds-icon--arrow-down,.tcds-icon--arrow-down--utility,.bg-icon--arrow-down,.bg-icon--arrow-down--utility,tcds-icon[icon~=arrow-down],tcds-icon[icon~=arrow-down][category~=utility]{--tcds-icon: var(--tcds-icon-utility-arrow-down)}.tcds-icon--arrow-left,.tcds-icon--arrow-left--utility,.bg-icon--arrow-left,.bg-icon--arrow-left--utility,tcds-icon[icon~=arrow-left],tcds-icon[icon~=arrow-left][category~=utility]{--tcds-icon: var(--tcds-icon-utility-arrow-left)}.tcds-icon--arrow-right,.tcds-icon--arrow-right--utility,.bg-icon--arrow-right,.bg-icon--arrow-right--utility,tcds-icon[icon~=arrow-right],tcds-icon[icon~=arrow-right][category~=utility]{--tcds-icon: var(--tcds-icon-utility-arrow-right)}.tcds-icon--arrow-up,.tcds-icon--arrow-up--utility,.bg-icon--arrow-up,.bg-icon--arrow-up--utility,tcds-icon[icon~=arrow-up],tcds-icon[icon~=arrow-up][category~=utility]{--tcds-icon: var(--tcds-icon-utility-arrow-up)}.tcds-icon--caret-down,.tcds-icon--caret-down--utility,.bg-icon--caret-down,.bg-icon--caret-down--utility,tcds-icon[icon~=caret-down],tcds-icon[icon~=caret-down][category~=utility]{--tcds-icon: var(--tcds-icon-utility-caret-down)}.tcds-icon--caret-left,.tcds-icon--caret-left--utility,.bg-icon--caret-left,.bg-icon--caret-left--utility,tcds-icon[icon~=caret-left],tcds-icon[icon~=caret-left][category~=utility]{--tcds-icon: var(--tcds-icon-utility-caret-left)}.tcds-icon--caret-right-thin,.tcds-icon--caret-right-thin--utility,.bg-icon--caret-right-thin,.bg-icon--caret-right-thin--utility,tcds-icon[icon~=caret-right-thin],tcds-icon[icon~=caret-right-thin][category~=utility]{--tcds-icon: var(--tcds-icon-utility-caret-right-thin)}.tcds-icon--caret-right,.tcds-icon--caret-right--utility,.bg-icon--caret-right,.bg-icon--caret-right--utility,tcds-icon[icon~=caret-right],tcds-icon[icon~=caret-right][category~=utility]{--tcds-icon: var(--tcds-icon-utility-caret-right)}.tcds-icon--caret-up,.tcds-icon--caret-up--utility,.bg-icon--caret-up,.bg-icon--caret-up--utility,tcds-icon[icon~=caret-up],tcds-icon[icon~=caret-up][category~=utility]{--tcds-icon: var(--tcds-icon-utility-caret-up)}.tcds-icon--check,.tcds-icon--check--utility,.bg-icon--check,.bg-icon--check--utility,tcds-icon[icon~=check],tcds-icon[icon~=check][category~=utility]{--tcds-icon: var(--tcds-icon-utility-check)}.tcds-icon--close,.tcds-icon--close--utility,.bg-icon--close,.bg-icon--close--utility,tcds-icon[icon~=close],tcds-icon[icon~=close][category~=utility]{--tcds-icon: var(--tcds-icon-utility-close)}.tcds-icon--desktop,.tcds-icon--desktop--utility,.bg-icon--desktop,.bg-icon--desktop--utility,tcds-icon[icon~=desktop],tcds-icon[icon~=desktop][category~=utility]{--tcds-icon: var(--tcds-icon-utility-desktop)}.tcds-icon--download,.tcds-icon--download--utility,.bg-icon--download,.bg-icon--download--utility,tcds-icon[icon~=download],tcds-icon[icon~=download][category~=utility]{--tcds-icon: var(--tcds-icon-utility-download)}.tcds-icon--error,.tcds-icon--error--utility,.bg-icon--error,.bg-icon--error--utility,tcds-icon[icon~=error],tcds-icon[icon~=error][category~=utility]{--tcds-icon: var(--tcds-icon-utility-error)}.tcds-icon--external,.tcds-icon--external--utility,.bg-icon--external,.bg-icon--external--utility,tcds-icon[icon~=external],tcds-icon[icon~=external][category~=utility]{--tcds-icon: var(--tcds-icon-utility-external)}.tcds-icon--filter,.tcds-icon--filter--utility,.bg-icon--filter,.bg-icon--filter--utility,tcds-icon[icon~=filter],tcds-icon[icon~=filter][category~=utility]{--tcds-icon: var(--tcds-icon-utility-filter)}.tcds-icon--geolocate,.tcds-icon--geolocate--utility,.bg-icon--geolocate,.bg-icon--geolocate--utility,tcds-icon[icon~=geolocate],tcds-icon[icon~=geolocate][category~=utility]{--tcds-icon: var(--tcds-icon-utility-geolocate)}.tcds-icon--grabber,.tcds-icon--grabber--utility,.bg-icon--grabber,.bg-icon--grabber--utility,tcds-icon[icon~=grabber],tcds-icon[icon~=grabber][category~=utility]{--tcds-icon: var(--tcds-icon-utility-grabber)}.tcds-icon--info,.tcds-icon--info--utility,.bg-icon--info,.bg-icon--info--utility,tcds-icon[icon~=info],tcds-icon[icon~=info][category~=utility]{--tcds-icon: var(--tcds-icon-utility-info)}.tcds-icon--laptop,.tcds-icon--laptop--utility,.bg-icon--laptop,.bg-icon--laptop--utility,tcds-icon[icon~=laptop],tcds-icon[icon~=laptop][category~=utility]{--tcds-icon: var(--tcds-icon-utility-laptop)}.tcds-icon--list,.tcds-icon--list--utility,.bg-icon--list,.bg-icon--list--utility,tcds-icon[icon~=list],tcds-icon[icon~=list][category~=utility]{--tcds-icon: var(--tcds-icon-utility-list)}.tcds-icon--menu,.tcds-icon--menu--utility,.bg-icon--menu,.bg-icon--menu--utility,tcds-icon[icon~=menu],tcds-icon[icon~=menu][category~=utility]{--tcds-icon: var(--tcds-icon-utility-menu)}.tcds-icon--minus,.tcds-icon--minus--utility,.bg-icon--minus,.bg-icon--minus--utility,tcds-icon[icon~=minus],tcds-icon[icon~=minus][category~=utility]{--tcds-icon: var(--tcds-icon-utility-minus)}.tcds-icon--mobile,.tcds-icon--mobile--utility,.bg-icon--mobile,.bg-icon--mobile--utility,tcds-icon[icon~=mobile],tcds-icon[icon~=mobile][category~=utility]{--tcds-icon: var(--tcds-icon-utility-mobile)}.tcds-icon--pause,.tcds-icon--pause--utility,.bg-icon--pause,.bg-icon--pause--utility,tcds-icon[icon~=pause],tcds-icon[icon~=pause][category~=utility]{--tcds-icon: var(--tcds-icon-utility-pause)}.tcds-icon--pin-filled,.tcds-icon--pin-filled--utility,.bg-icon--pin-filled,.bg-icon--pin-filled--utility,tcds-icon[icon~=pin-filled],tcds-icon[icon~=pin-filled][category~=utility]{--tcds-icon: var(--tcds-icon-utility-pin-filled)}.tcds-icon--pin,.tcds-icon--pin--utility,.bg-icon--pin,.bg-icon--pin--utility,tcds-icon[icon~=pin],tcds-icon[icon~=pin][category~=utility]{--tcds-icon: var(--tcds-icon-utility-pin)}.tcds-icon--play,.tcds-icon--play--utility,.bg-icon--play,.bg-icon--play--utility,tcds-icon[icon~=play],tcds-icon[icon~=play][category~=utility]{--tcds-icon: var(--tcds-icon-utility-play)}.tcds-icon--plus,.tcds-icon--plus--utility,.bg-icon--plus,.bg-icon--plus--utility,tcds-icon[icon~=plus],tcds-icon[icon~=plus][category~=utility]{--tcds-icon: var(--tcds-icon-utility-plus)}.tcds-icon--quotation,.tcds-icon--quotation--utility,.bg-icon--quotation,.bg-icon--quotation--utility,tcds-icon[icon~=quotation],tcds-icon[icon~=quotation][category~=utility]{--tcds-icon: var(--tcds-icon-utility-quotation)}.tcds-icon--search,.tcds-icon--search--utility,.bg-icon--search,.bg-icon--search--utility,tcds-icon[icon~=search],tcds-icon[icon~=search][category~=utility]{--tcds-icon: var(--tcds-icon-utility-search)}.tcds-icon--star,.tcds-icon--star--utility,.bg-icon--star,.bg-icon--star--utility,tcds-icon[icon~=star],tcds-icon[icon~=star][category~=utility]{--tcds-icon: var(--tcds-icon-utility-star)}.tcds-icon--stop,.tcds-icon--stop--utility,.bg-icon--stop,.bg-icon--stop--utility,tcds-icon[icon~=stop],tcds-icon[icon~=stop][category~=utility]{--tcds-icon: var(--tcds-icon-utility-stop)}.tcds-icon--tablet,.tcds-icon--tablet--utility,.bg-icon--tablet,.bg-icon--tablet--utility,tcds-icon[icon~=tablet],tcds-icon[icon~=tablet][category~=utility]{--tcds-icon: var(--tcds-icon-utility-tablet)}.justify-content-start{justify-content:start !important}.justify-self-start{justify-self:start !important}.justify-content-end{justify-content:end !important}.justify-self-end{justify-self:end !important}.justify-content-center{justify-content:center !important}.justify-self-center{justify-self:center !important}.justify-content-space-between{justify-content:space-between !important}.justify-self-space-between{justify-self:space-between !important}.align-items-start{align-items:start !important}.align-self-start{align-self:start !important}.align-items-end{align-items:end !important}.align-self-end{align-self:end !important}.align-items-center{align-items:center !important}.align-self-center{align-self:center !important}.align-items-stretch{align-items:stretch !important}.align-self-stretch{align-self:stretch !important}.float-left{float:left !important;margin:0 var(--tcds-space-component-md) var(--tcds-space-component-md) 0}.float-right{float:right !important;margin:0 0 var(--tcds-space-component-md) var(--tcds-space-component-md)}@media(min-width: 320px){.xs\\:justify-content-start{justify-content:start !important}.xs\\:justify-self-start{justify-self:start !important}.xs\\:justify-content-end{justify-content:end !important}.xs\\:justify-self-end{justify-self:end !important}.xs\\:justify-content-center{justify-content:center !important}.xs\\:justify-self-center{justify-self:center !important}.xs\\:justify-content-space-between{justify-content:space-between !important}.xs\\:justify-self-space-between{justify-self:space-between !important}.xs\\:align-items-start{align-items:start !important}.xs\\:align-self-start{align-self:start !important}.xs\\:align-items-end{align-items:end !important}.xs\\:align-self-end{align-self:end !important}.xs\\:align-items-center{align-items:center !important}.xs\\:align-self-center{align-self:center !important}.xs\\:align-items-stretch{align-items:stretch !important}.xs\\:align-self-stretch{align-self:stretch !important}.xs\\:float-left{float:left !important;margin:0 var(--tcds-space-component-md) var(--tcds-space-component-md) 0}.xs\\:float-right{float:right !important;margin:0 0 var(--tcds-space-component-md) var(--tcds-space-component-md)}}@media(min-width: 640px){.sm\\:justify-content-start{justify-content:start !important}.sm\\:justify-self-start{justify-self:start !important}.sm\\:justify-content-end{justify-content:end !important}.sm\\:justify-self-end{justify-self:end !important}.sm\\:justify-content-center{justify-content:center !important}.sm\\:justify-self-center{justify-self:center !important}.sm\\:justify-content-space-between{justify-content:space-between !important}.sm\\:justify-self-space-between{justify-self:space-between !important}.sm\\:align-items-start{align-items:start !important}.sm\\:align-self-start{align-self:start !important}.sm\\:align-items-end{align-items:end !important}.sm\\:align-self-end{align-self:end !important}.sm\\:align-items-center{align-items:center !important}.sm\\:align-self-center{align-self:center !important}.sm\\:align-items-stretch{align-items:stretch !important}.sm\\:align-self-stretch{align-self:stretch !important}.sm\\:float-left{float:left !important;margin:0 var(--tcds-space-component-md) var(--tcds-space-component-md) 0}.sm\\:float-right{float:right !important;margin:0 0 var(--tcds-space-component-md) var(--tcds-space-component-md)}}@media(min-width: 960px){.md\\:justify-content-start{justify-content:start !important}.md\\:justify-self-start{justify-self:start !important}.md\\:justify-content-end{justify-content:end !important}.md\\:justify-self-end{justify-self:end !important}.md\\:justify-content-center{justify-content:center !important}.md\\:justify-self-center{justify-self:center !important}.md\\:justify-content-space-between{justify-content:space-between !important}.md\\:justify-self-space-between{justify-self:space-between !important}.md\\:align-items-start{align-items:start !important}.md\\:align-self-start{align-self:start !important}.md\\:align-items-end{align-items:end !important}.md\\:align-self-end{align-self:end !important}.md\\:align-items-center{align-items:center !important}.md\\:align-self-center{align-self:center !important}.md\\:align-items-stretch{align-items:stretch !important}.md\\:align-self-stretch{align-self:stretch !important}.md\\:float-left{float:left !important;margin:0 var(--tcds-space-component-md) var(--tcds-space-component-md) 0}.md\\:float-right{float:right !important;margin:0 0 var(--tcds-space-component-md) var(--tcds-space-component-md)}}@media(min-width: 1312px){.lg\\:justify-content-start{justify-content:start !important}.lg\\:justify-self-start{justify-self:start !important}.lg\\:justify-content-end{justify-content:end !important}.lg\\:justify-self-end{justify-self:end !important}.lg\\:justify-content-center{justify-content:center !important}.lg\\:justify-self-center{justify-self:center !important}.lg\\:justify-content-space-between{justify-content:space-between !important}.lg\\:justify-self-space-between{justify-self:space-between !important}.lg\\:align-items-start{align-items:start !important}.lg\\:align-self-start{align-self:start !important}.lg\\:align-items-end{align-items:end !important}.lg\\:align-self-end{align-self:end !important}.lg\\:align-items-center{align-items:center !important}.lg\\:align-self-center{align-self:center !important}.lg\\:align-items-stretch{align-items:stretch !important}.lg\\:align-self-stretch{align-self:stretch !important}.lg\\:float-left{float:left !important;margin:0 var(--tcds-space-component-md) var(--tcds-space-component-md) 0}.lg\\:float-right{float:right !important;margin:0 0 var(--tcds-space-component-md) var(--tcds-space-component-md)}}@media(min-width: 1920px){.xl\\:justify-content-start{justify-content:start !important}.xl\\:justify-self-start{justify-self:start !important}.xl\\:justify-content-end{justify-content:end !important}.xl\\:justify-self-end{justify-self:end !important}.xl\\:justify-content-center{justify-content:center !important}.xl\\:justify-self-center{justify-self:center !important}.xl\\:justify-content-space-between{justify-content:space-between !important}.xl\\:justify-self-space-between{justify-self:space-between !important}.xl\\:align-items-start{align-items:start !important}.xl\\:align-self-start{align-self:start !important}.xl\\:align-items-end{align-items:end !important}.xl\\:align-self-end{align-self:end !important}.xl\\:align-items-center{align-items:center !important}.xl\\:align-self-center{align-self:center !important}.xl\\:align-items-stretch{align-items:stretch !important}.xl\\:align-self-stretch{align-self:stretch !important}.xl\\:float-left{float:left !important;margin:0 var(--tcds-space-component-md) var(--tcds-space-component-md) 0}.xl\\:float-right{float:right !important;margin:0 0 var(--tcds-space-component-md) var(--tcds-space-component-md)}}.container-xs{--tcds-size-container: var(--tcds-size-layout-xs)}.container-sm{--tcds-size-container: var(--tcds-size-layout-sm)}.container-md{--tcds-size-container: var(--tcds-size-layout-md)}.container-lg{--tcds-size-container: var(--tcds-size-layout-lg)}.container-xl{--tcds-size-container: var(--tcds-size-layout-xl)}.container-xs,.container-sm,.container-md,.container-lg,.container-xl{--_tcds-container-gutter: var(--tcds-container-gutter, var(--tcds-site-inner-gutter));--_tcds-size-container: var(--tcds-size-container, var(--tcds-size-layout-lg));width:calc(100% - var(--_tcds-container-gutter)*2) !important;max-width:var(--_tcds-size-container) !important;margin-inline:var(--tcds-container-margin-inline, auto) !important;padding:0 !important;position:relative}.flex{display:flex !important}.inline-flex{display:inline-flex !important}.flex:not(.flex--no-wrap){flex-wrap:wrap !important}.flex--column{flex-direction:column !important}.flex-1-0{flex:1 0}.flex--row-reverse{flex-direction:row-reverse !important}@media(min-width: 320px){.xs\\:flex--row{flex-direction:row !important}.xs\\:flex--row-reverse{flex-direction:row-reverse !important}}@media(min-width: 640px){.sm\\:flex--row{flex-direction:row !important}.sm\\:flex--row-reverse{flex-direction:row-reverse !important}}@media(min-width: 960px){.md\\:flex--row{flex-direction:row !important}.md\\:flex--row-reverse{flex-direction:row-reverse !important}}@media(min-width: 1312px){.lg\\:flex--row{flex-direction:row !important}.lg\\:flex--row-reverse{flex-direction:row-reverse !important}}@media(min-width: 1920px){.xl\\:flex--row{flex-direction:row !important}.xl\\:flex--row-reverse{flex-direction:row-reverse !important}}.grid{display:grid !important;grid-template-columns:repeat(12, 1fr)}:where(.grid>*){--grid-item-column-span: 12;grid-column:span var(--grid-item-column-span)}.grid-item--1\\/1{--grid-item-column-span: 12}.grid-item--1\\/2{--grid-item-column-span: 6}.grid-item--1\\/3{--grid-item-column-span: 4}.grid-item--2\\/3{--grid-item-column-span: 8}.grid-item--1\\/4{--grid-item-column-span: 3}.grid-item--3\\/4{--grid-item-column-span: 9}@media(min-width: 320px){.xs\\:grid-item--1\\/1{--grid-item-column-span: 12}.xs\\:grid-item--1\\/2{--grid-item-column-span: 6}.xs\\:grid-item--1\\/3{--grid-item-column-span: 4}.xs\\:grid-item--2\\/3{--grid-item-column-span: 8}.xs\\:grid-item--1\\/4{--grid-item-column-span: 3}.xs\\:grid-item--3\\/4{--grid-item-column-span: 9}}@media(min-width: 640px){.sm\\:grid-item--1\\/1{--grid-item-column-span: 12}.sm\\:grid-item--1\\/2{--grid-item-column-span: 6}.sm\\:grid-item--1\\/3{--grid-item-column-span: 4}.sm\\:grid-item--2\\/3{--grid-item-column-span: 8}.sm\\:grid-item--1\\/4{--grid-item-column-span: 3}.sm\\:grid-item--3\\/4{--grid-item-column-span: 9}}@media(min-width: 960px){.md\\:grid-item--1\\/1{--grid-item-column-span: 12}.md\\:grid-item--1\\/2{--grid-item-column-span: 6}.md\\:grid-item--1\\/3{--grid-item-column-span: 4}.md\\:grid-item--2\\/3{--grid-item-column-span: 8}.md\\:grid-item--1\\/4{--grid-item-column-span: 3}.md\\:grid-item--3\\/4{--grid-item-column-span: 9}}@media(min-width: 1312px){.lg\\:grid-item--1\\/1{--grid-item-column-span: 12}.lg\\:grid-item--1\\/2{--grid-item-column-span: 6}.lg\\:grid-item--1\\/3{--grid-item-column-span: 4}.lg\\:grid-item--2\\/3{--grid-item-column-span: 8}.lg\\:grid-item--1\\/4{--grid-item-column-span: 3}.lg\\:grid-item--3\\/4{--grid-item-column-span: 9}}@media(min-width: 1920px){.xl\\:grid-item--1\\/1{--grid-item-column-span: 12}.xl\\:grid-item--1\\/2{--grid-item-column-span: 6}.xl\\:grid-item--1\\/3{--grid-item-column-span: 4}.xl\\:grid-item--2\\/3{--grid-item-column-span: 8}.xl\\:grid-item--1\\/4{--grid-item-column-span: 3}.xl\\:grid-item--3\\/4{--grid-item-column-span: 9}}[hidden]:where(:not([hidden=until-found])){display:none !important}.hidden{display:none !important}@media(min-width: 320px){.xs\\:hidden{display:none !important}}@media(min-width: 640px){.sm\\:hidden{display:none !important}}@media(min-width: 960px){.md\\:hidden{display:none !important}}@media(min-width: 1312px){.lg\\:hidden{display:none !important}}@media(min-width: 1920px){.xl\\:hidden{display:none !important}}.visually-hidden:not(:focus){clip:rect(0, 0, 0, 0);clip-path:inset(50%);height:1px;width:1px;position:absolute}.visually-hidden:not(:focus){clip:rect(0, 0, 0, 0);clip-path:inset(50%);height:1px;width:1px;position:absolute}@media(min-width: 320px){.xs\\:visually-hidden:not(:focus){clip:rect(0, 0, 0, 0);clip-path:inset(50%);height:1px;width:1px;position:absolute}}@media(min-width: 640px){.sm\\:visually-hidden:not(:focus){clip:rect(0, 0, 0, 0);clip-path:inset(50%);height:1px;width:1px;position:absolute}}@media(min-width: 960px){.md\\:visually-hidden:not(:focus){clip:rect(0, 0, 0, 0);clip-path:inset(50%);height:1px;width:1px;position:absolute}}@media(min-width: 1312px){.lg\\:visually-hidden:not(:focus){clip:rect(0, 0, 0, 0);clip-path:inset(50%);height:1px;width:1px;position:absolute}}@media(min-width: 1920px){.xl\\:visually-hidden:not(:focus){clip:rect(0, 0, 0, 0);clip-path:inset(50%);height:1px;width:1px;position:absolute}}.gap-xs{gap:min(var(--tcds-space-layout-xs),1.3888888889%) !important}.row-gap-xs{row-gap:min(var(--tcds-space-layout-xs),1.3888888889%) !important}.column-gap-xs{column-gap:var(--tcds-space-layout-xs) !important}.gap-sm{gap:min(var(--tcds-space-layout-sm),2.0833333333%) !important}.row-gap-sm{row-gap:min(var(--tcds-space-layout-sm),2.0833333333%) !important}.column-gap-sm{column-gap:var(--tcds-space-layout-sm) !important}.gap-md{gap:min(var(--tcds-space-layout-md),4.1666666667%) !important}.row-gap-md{row-gap:min(var(--tcds-space-layout-md),4.1666666667%) !important}.column-gap-md{column-gap:var(--tcds-space-layout-md) !important}.gap-lg{gap:min(var(--tcds-space-layout-lg),5.5555555556%) !important}.row-gap-lg{row-gap:min(var(--tcds-space-layout-lg),5.5555555556%) !important}.column-gap-lg{column-gap:var(--tcds-space-layout-lg) !important}.gap-xl{gap:min(var(--tcds-space-layout-xl),8.3333333333%) !important}.row-gap-xl{row-gap:min(var(--tcds-space-layout-xl),8.3333333333%) !important}.column-gap-xl{column-gap:var(--tcds-space-layout-xl) !important}@media(min-width: 320px){.xs\\:gap-xs{gap:min(var(--tcds-space-layout-xs),1.3888888889%) !important}.xs\\:row-gap-xs{row-gap:min(var(--tcds-space-layout-xs),1.3888888889%) !important}.xs\\:column-gap-xs{column-gap:var(--tcds-space-layout-xs) !important}.xs\\:gap-sm{gap:min(var(--tcds-space-layout-sm),2.0833333333%) !important}.xs\\:row-gap-sm{row-gap:min(var(--tcds-space-layout-sm),2.0833333333%) !important}.xs\\:column-gap-sm{column-gap:var(--tcds-space-layout-sm) !important}.xs\\:gap-md{gap:min(var(--tcds-space-layout-md),4.1666666667%) !important}.xs\\:row-gap-md{row-gap:min(var(--tcds-space-layout-md),4.1666666667%) !important}.xs\\:column-gap-md{column-gap:var(--tcds-space-layout-md) !important}.xs\\:gap-lg{gap:min(var(--tcds-space-layout-lg),5.5555555556%) !important}.xs\\:row-gap-lg{row-gap:min(var(--tcds-space-layout-lg),5.5555555556%) !important}.xs\\:column-gap-lg{column-gap:var(--tcds-space-layout-lg) !important}.xs\\:gap-xl{gap:min(var(--tcds-space-layout-xl),8.3333333333%) !important}.xs\\:row-gap-xl{row-gap:min(var(--tcds-space-layout-xl),8.3333333333%) !important}.xs\\:column-gap-xl{column-gap:var(--tcds-space-layout-xl) !important}}@media(min-width: 640px){.sm\\:gap-xs{gap:min(var(--tcds-space-layout-xs),1.3888888889%) !important}.sm\\:row-gap-xs{row-gap:min(var(--tcds-space-layout-xs),1.3888888889%) !important}.sm\\:column-gap-xs{column-gap:var(--tcds-space-layout-xs) !important}.sm\\:gap-sm{gap:min(var(--tcds-space-layout-sm),2.0833333333%) !important}.sm\\:row-gap-sm{row-gap:min(var(--tcds-space-layout-sm),2.0833333333%) !important}.sm\\:column-gap-sm{column-gap:var(--tcds-space-layout-sm) !important}.sm\\:gap-md{gap:min(var(--tcds-space-layout-md),4.1666666667%) !important}.sm\\:row-gap-md{row-gap:min(var(--tcds-space-layout-md),4.1666666667%) !important}.sm\\:column-gap-md{column-gap:var(--tcds-space-layout-md) !important}.sm\\:gap-lg{gap:min(var(--tcds-space-layout-lg),5.5555555556%) !important}.sm\\:row-gap-lg{row-gap:min(var(--tcds-space-layout-lg),5.5555555556%) !important}.sm\\:column-gap-lg{column-gap:var(--tcds-space-layout-lg) !important}.sm\\:gap-xl{gap:min(var(--tcds-space-layout-xl),8.3333333333%) !important}.sm\\:row-gap-xl{row-gap:min(var(--tcds-space-layout-xl),8.3333333333%) !important}.sm\\:column-gap-xl{column-gap:var(--tcds-space-layout-xl) !important}}@media(min-width: 960px){.md\\:gap-xs{gap:min(var(--tcds-space-layout-xs),1.3888888889%) !important}.md\\:row-gap-xs{row-gap:min(var(--tcds-space-layout-xs),1.3888888889%) !important}.md\\:column-gap-xs{column-gap:var(--tcds-space-layout-xs) !important}.md\\:gap-sm{gap:min(var(--tcds-space-layout-sm),2.0833333333%) !important}.md\\:row-gap-sm{row-gap:min(var(--tcds-space-layout-sm),2.0833333333%) !important}.md\\:column-gap-sm{column-gap:var(--tcds-space-layout-sm) !important}.md\\:gap-md{gap:min(var(--tcds-space-layout-md),4.1666666667%) !important}.md\\:row-gap-md{row-gap:min(var(--tcds-space-layout-md),4.1666666667%) !important}.md\\:column-gap-md{column-gap:var(--tcds-space-layout-md) !important}.md\\:gap-lg{gap:min(var(--tcds-space-layout-lg),5.5555555556%) !important}.md\\:row-gap-lg{row-gap:min(var(--tcds-space-layout-lg),5.5555555556%) !important}.md\\:column-gap-lg{column-gap:var(--tcds-space-layout-lg) !important}.md\\:gap-xl{gap:min(var(--tcds-space-layout-xl),8.3333333333%) !important}.md\\:row-gap-xl{row-gap:min(var(--tcds-space-layout-xl),8.3333333333%) !important}.md\\:column-gap-xl{column-gap:var(--tcds-space-layout-xl) !important}}@media(min-width: 1312px){.lg\\:gap-xs{gap:min(var(--tcds-space-layout-xs),1.3888888889%) !important}.lg\\:row-gap-xs{row-gap:min(var(--tcds-space-layout-xs),1.3888888889%) !important}.lg\\:column-gap-xs{column-gap:var(--tcds-space-layout-xs) !important}.lg\\:gap-sm{gap:min(var(--tcds-space-layout-sm),2.0833333333%) !important}.lg\\:row-gap-sm{row-gap:min(var(--tcds-space-layout-sm),2.0833333333%) !important}.lg\\:column-gap-sm{column-gap:var(--tcds-space-layout-sm) !important}.lg\\:gap-md{gap:min(var(--tcds-space-layout-md),4.1666666667%) !important}.lg\\:row-gap-md{row-gap:min(var(--tcds-space-layout-md),4.1666666667%) !important}.lg\\:column-gap-md{column-gap:var(--tcds-space-layout-md) !important}.lg\\:gap-lg{gap:min(var(--tcds-space-layout-lg),5.5555555556%) !important}.lg\\:row-gap-lg{row-gap:min(var(--tcds-space-layout-lg),5.5555555556%) !important}.lg\\:column-gap-lg{column-gap:var(--tcds-space-layout-lg) !important}.lg\\:gap-xl{gap:min(var(--tcds-space-layout-xl),8.3333333333%) !important}.lg\\:row-gap-xl{row-gap:min(var(--tcds-space-layout-xl),8.3333333333%) !important}.lg\\:column-gap-xl{column-gap:var(--tcds-space-layout-xl) !important}}@media(min-width: 1920px){.xl\\:gap-xs{gap:min(var(--tcds-space-layout-xs),1.3888888889%) !important}.xl\\:row-gap-xs{row-gap:min(var(--tcds-space-layout-xs),1.3888888889%) !important}.xl\\:column-gap-xs{column-gap:var(--tcds-space-layout-xs) !important}.xl\\:gap-sm{gap:min(var(--tcds-space-layout-sm),2.0833333333%) !important}.xl\\:row-gap-sm{row-gap:min(var(--tcds-space-layout-sm),2.0833333333%) !important}.xl\\:column-gap-sm{column-gap:var(--tcds-space-layout-sm) !important}.xl\\:gap-md{gap:min(var(--tcds-space-layout-md),4.1666666667%) !important}.xl\\:row-gap-md{row-gap:min(var(--tcds-space-layout-md),4.1666666667%) !important}.xl\\:column-gap-md{column-gap:var(--tcds-space-layout-md) !important}.xl\\:gap-lg{gap:min(var(--tcds-space-layout-lg),5.5555555556%) !important}.xl\\:row-gap-lg{row-gap:min(var(--tcds-space-layout-lg),5.5555555556%) !important}.xl\\:column-gap-lg{column-gap:var(--tcds-space-layout-lg) !important}.xl\\:gap-xl{gap:min(var(--tcds-space-layout-xl),8.3333333333%) !important}.xl\\:row-gap-xl{row-gap:min(var(--tcds-space-layout-xl),8.3333333333%) !important}.xl\\:column-gap-xl{column-gap:var(--tcds-space-layout-xl) !important}}.padding-block-xs{--padding-block-start: var(--tcds-space-layout-xs);--padding-block-end: var(--tcds-space-layout-xs);--padding-block: var(--padding-block-start) var(--padding-block-end);padding-block-start:var(--padding-block-start);padding-block-end:var(--padding-block-end)}.padding-block-start-xs{--padding-block-start: var(--tcds-space-layout-xs);padding-block-start:var(--padding-block-start)}.padding-block-end-xs{--padding-block-end: var(--tcds-space-layout-xs);padding-block-end:var(--padding-block-end)}.margin-block-xs{--margin-block-start: var(--tcds-space-layout-xs);--margin-block-end: var(--tcds-space-layout-xs);--margin-block: var(--margin-block-start) var(--margin-block-end);margin-block-start:var(--margin-block-start);margin-block-end:var(--margin-block-end)}.margin-block-start-xs{--margin-block-start: var(--tcds-space-layout-xs);margin-block-start:var(--margin-block-start)}.margin-block-end-xs{--margin-block-end: var(--tcds-space-layout-xs);margin-block-end:var(--margin-block-end)}.padding-block-sm{--padding-block-start: var(--tcds-space-layout-sm);--padding-block-end: var(--tcds-space-layout-sm);--padding-block: var(--padding-block-start) var(--padding-block-end);padding-block-start:var(--padding-block-start);padding-block-end:var(--padding-block-end)}.padding-block-start-sm{--padding-block-start: var(--tcds-space-layout-sm);padding-block-start:var(--padding-block-start)}.padding-block-end-sm{--padding-block-end: var(--tcds-space-layout-sm);padding-block-end:var(--padding-block-end)}.margin-block-sm{--margin-block-start: var(--tcds-space-layout-sm);--margin-block-end: var(--tcds-space-layout-sm);--margin-block: var(--margin-block-start) var(--margin-block-end);margin-block-start:var(--margin-block-start);margin-block-end:var(--margin-block-end)}.margin-block-start-sm{--margin-block-start: var(--tcds-space-layout-sm);margin-block-start:var(--margin-block-start)}.margin-block-end-sm{--margin-block-end: var(--tcds-space-layout-sm);margin-block-end:var(--margin-block-end)}.padding-block-md{--padding-block-start: var(--tcds-space-layout-md);--padding-block-end: var(--tcds-space-layout-md);--padding-block: var(--padding-block-start) var(--padding-block-end);padding-block-start:var(--padding-block-start);padding-block-end:var(--padding-block-end)}.padding-block-start-md{--padding-block-start: var(--tcds-space-layout-md);padding-block-start:var(--padding-block-start)}.padding-block-end-md{--padding-block-end: var(--tcds-space-layout-md);padding-block-end:var(--padding-block-end)}.margin-block-md{--margin-block-start: var(--tcds-space-layout-md);--margin-block-end: var(--tcds-space-layout-md);--margin-block: var(--margin-block-start) var(--margin-block-end);margin-block-start:var(--margin-block-start);margin-block-end:var(--margin-block-end)}.margin-block-start-md{--margin-block-start: var(--tcds-space-layout-md);margin-block-start:var(--margin-block-start)}.margin-block-end-md{--margin-block-end: var(--tcds-space-layout-md);margin-block-end:var(--margin-block-end)}.padding-block-lg{--padding-block-start: var(--tcds-space-layout-lg);--padding-block-end: var(--tcds-space-layout-lg);--padding-block: var(--padding-block-start) var(--padding-block-end);padding-block-start:var(--padding-block-start);padding-block-end:var(--padding-block-end)}.padding-block-start-lg{--padding-block-start: var(--tcds-space-layout-lg);padding-block-start:var(--padding-block-start)}.padding-block-end-lg{--padding-block-end: var(--tcds-space-layout-lg);padding-block-end:var(--padding-block-end)}.margin-block-lg{--margin-block-start: var(--tcds-space-layout-lg);--margin-block-end: var(--tcds-space-layout-lg);--margin-block: var(--margin-block-start) var(--margin-block-end);margin-block-start:var(--margin-block-start);margin-block-end:var(--margin-block-end)}.margin-block-start-lg{--margin-block-start: var(--tcds-space-layout-lg);margin-block-start:var(--margin-block-start)}.margin-block-end-lg{--margin-block-end: var(--tcds-space-layout-lg);margin-block-end:var(--margin-block-end)}.padding-block-xl{--padding-block-start: var(--tcds-space-layout-xl);--padding-block-end: var(--tcds-space-layout-xl);--padding-block: var(--padding-block-start) var(--padding-block-end);padding-block-start:var(--padding-block-start);padding-block-end:var(--padding-block-end)}.padding-block-start-xl{--padding-block-start: var(--tcds-space-layout-xl);padding-block-start:var(--padding-block-start)}.padding-block-end-xl{--padding-block-end: var(--tcds-space-layout-xl);padding-block-end:var(--padding-block-end)}.margin-block-xl{--margin-block-start: var(--tcds-space-layout-xl);--margin-block-end: var(--tcds-space-layout-xl);--margin-block: var(--margin-block-start) var(--margin-block-end);margin-block-start:var(--margin-block-start);margin-block-end:var(--margin-block-end)}.margin-block-start-xl{--margin-block-start: var(--tcds-space-layout-xl);margin-block-start:var(--margin-block-start)}.margin-block-end-xl{--margin-block-end: var(--tcds-space-layout-xl);margin-block-end:var(--margin-block-end)}@media(min-width: 320px){.xs\\:padding-block-xs{--padding-block-start: var(--tcds-space-layout-xs);--padding-block-end: var(--tcds-space-layout-xs);--padding-block: var(--padding-block-start) var(--padding-block-end);padding-block-start:var(--padding-block-start);padding-block-end:var(--padding-block-end)}.xs\\:padding-block-start-xs{--padding-block-start: var(--tcds-space-layout-xs);padding-block-start:var(--padding-block-start)}.xs\\:padding-block-end-xs{--padding-block-end: var(--tcds-space-layout-xs);padding-block-end:var(--padding-block-end)}.xs\\:margin-block-xs{--margin-block-start: var(--tcds-space-layout-xs);--margin-block-end: var(--tcds-space-layout-xs);--margin-block: var(--margin-block-start) var(--margin-block-end);margin-block-start:var(--margin-block-start);margin-block-end:var(--margin-block-end)}.xs\\:margin-block-start-xs{--margin-block-start: var(--tcds-space-layout-xs);margin-block-start:var(--margin-block-start)}.xs\\:margin-block-end-xs{--margin-block-end: var(--tcds-space-layout-xs);margin-block-end:var(--margin-block-end)}.xs\\:padding-block-sm{--padding-block-start: var(--tcds-space-layout-sm);--padding-block-end: var(--tcds-space-layout-sm);--padding-block: var(--padding-block-start) var(--padding-block-end);padding-block-start:var(--padding-block-start);padding-block-end:var(--padding-block-end)}.xs\\:padding-block-start-sm{--padding-block-start: var(--tcds-space-layout-sm);padding-block-start:var(--padding-block-start)}.xs\\:padding-block-end-sm{--padding-block-end: var(--tcds-space-layout-sm);padding-block-end:var(--padding-block-end)}.xs\\:margin-block-sm{--margin-block-start: var(--tcds-space-layout-sm);--margin-block-end: var(--tcds-space-layout-sm);--margin-block: var(--margin-block-start) var(--margin-block-end);margin-block-start:var(--margin-block-start);margin-block-end:var(--margin-block-end)}.xs\\:margin-block-start-sm{--margin-block-start: var(--tcds-space-layout-sm);margin-block-start:var(--margin-block-start)}.xs\\:margin-block-end-sm{--margin-block-end: var(--tcds-space-layout-sm);margin-block-end:var(--margin-block-end)}.xs\\:padding-block-md{--padding-block-start: var(--tcds-space-layout-md);--padding-block-end: var(--tcds-space-layout-md);--padding-block: var(--padding-block-start) var(--padding-block-end);padding-block-start:var(--padding-block-start);padding-block-end:var(--padding-block-end)}.xs\\:padding-block-start-md{--padding-block-start: var(--tcds-space-layout-md);padding-block-start:var(--padding-block-start)}.xs\\:padding-block-end-md{--padding-block-end: var(--tcds-space-layout-md);padding-block-end:var(--padding-block-end)}.xs\\:margin-block-md{--margin-block-start: var(--tcds-space-layout-md);--margin-block-end: var(--tcds-space-layout-md);--margin-block: var(--margin-block-start) var(--margin-block-end);margin-block-start:var(--margin-block-start);margin-block-end:var(--margin-block-end)}.xs\\:margin-block-start-md{--margin-block-start: var(--tcds-space-layout-md);margin-block-start:var(--margin-block-start)}.xs\\:margin-block-end-md{--margin-block-end: var(--tcds-space-layout-md);margin-block-end:var(--margin-block-end)}.xs\\:padding-block-lg{--padding-block-start: var(--tcds-space-layout-lg);--padding-block-end: var(--tcds-space-layout-lg);--padding-block: var(--padding-block-start) var(--padding-block-end);padding-block-start:var(--padding-block-start);padding-block-end:var(--padding-block-end)}.xs\\:padding-block-start-lg{--padding-block-start: var(--tcds-space-layout-lg);padding-block-start:var(--padding-block-start)}.xs\\:padding-block-end-lg{--padding-block-end: var(--tcds-space-layout-lg);padding-block-end:var(--padding-block-end)}.xs\\:margin-block-lg{--margin-block-start: var(--tcds-space-layout-lg);--margin-block-end: var(--tcds-space-layout-lg);--margin-block: var(--margin-block-start) var(--margin-block-end);margin-block-start:var(--margin-block-start);margin-block-end:var(--margin-block-end)}.xs\\:margin-block-start-lg{--margin-block-start: var(--tcds-space-layout-lg);margin-block-start:var(--margin-block-start)}.xs\\:margin-block-end-lg{--margin-block-end: var(--tcds-space-layout-lg);margin-block-end:var(--margin-block-end)}.xs\\:padding-block-xl{--padding-block-start: var(--tcds-space-layout-xl);--padding-block-end: var(--tcds-space-layout-xl);--padding-block: var(--padding-block-start) var(--padding-block-end);padding-block-start:var(--padding-block-start);padding-block-end:var(--padding-block-end)}.xs\\:padding-block-start-xl{--padding-block-start: var(--tcds-space-layout-xl);padding-block-start:var(--padding-block-start)}.xs\\:padding-block-end-xl{--padding-block-end: var(--tcds-space-layout-xl);padding-block-end:var(--padding-block-end)}.xs\\:margin-block-xl{--margin-block-start: var(--tcds-space-layout-xl);--margin-block-end: var(--tcds-space-layout-xl);--margin-block: var(--margin-block-start) var(--margin-block-end);margin-block-start:var(--margin-block-start);margin-block-end:var(--margin-block-end)}.xs\\:margin-block-start-xl{--margin-block-start: var(--tcds-space-layout-xl);margin-block-start:var(--margin-block-start)}.xs\\:margin-block-end-xl{--margin-block-end: var(--tcds-space-layout-xl);margin-block-end:var(--margin-block-end)}}@media(min-width: 640px){.sm\\:padding-block-xs{--padding-block-start: var(--tcds-space-layout-xs);--padding-block-end: var(--tcds-space-layout-xs);--padding-block: var(--padding-block-start) var(--padding-block-end);padding-block-start:var(--padding-block-start);padding-block-end:var(--padding-block-end)}.sm\\:padding-block-start-xs{--padding-block-start: var(--tcds-space-layout-xs);padding-block-start:var(--padding-block-start)}.sm\\:padding-block-end-xs{--padding-block-end: var(--tcds-space-layout-xs);padding-block-end:var(--padding-block-end)}.sm\\:margin-block-xs{--margin-block-start: var(--tcds-space-layout-xs);--margin-block-end: var(--tcds-space-layout-xs);--margin-block: var(--margin-block-start) var(--margin-block-end);margin-block-start:var(--margin-block-start);margin-block-end:var(--margin-block-end)}.sm\\:margin-block-start-xs{--margin-block-start: var(--tcds-space-layout-xs);margin-block-start:var(--margin-block-start)}.sm\\:margin-block-end-xs{--margin-block-end: var(--tcds-space-layout-xs);margin-block-end:var(--margin-block-end)}.sm\\:padding-block-sm{--padding-block-start: var(--tcds-space-layout-sm);--padding-block-end: var(--tcds-space-layout-sm);--padding-block: var(--padding-block-start) var(--padding-block-end);padding-block-start:var(--padding-block-start);padding-block-end:var(--padding-block-end)}.sm\\:padding-block-start-sm{--padding-block-start: var(--tcds-space-layout-sm);padding-block-start:var(--padding-block-start)}.sm\\:padding-block-end-sm{--padding-block-end: var(--tcds-space-layout-sm);padding-block-end:var(--padding-block-end)}.sm\\:margin-block-sm{--margin-block-start: var(--tcds-space-layout-sm);--margin-block-end: var(--tcds-space-layout-sm);--margin-block: var(--margin-block-start) var(--margin-block-end);margin-block-start:var(--margin-block-start);margin-block-end:var(--margin-block-end)}.sm\\:margin-block-start-sm{--margin-block-start: var(--tcds-space-layout-sm);margin-block-start:var(--margin-block-start)}.sm\\:margin-block-end-sm{--margin-block-end: var(--tcds-space-layout-sm);margin-block-end:var(--margin-block-end)}.sm\\:padding-block-md{--padding-block-start: var(--tcds-space-layout-md);--padding-block-end: var(--tcds-space-layout-md);--padding-block: var(--padding-block-start) var(--padding-block-end);padding-block-start:var(--padding-block-start);padding-block-end:var(--padding-block-end)}.sm\\:padding-block-start-md{--padding-block-start: var(--tcds-space-layout-md);padding-block-start:var(--padding-block-start)}.sm\\:padding-block-end-md{--padding-block-end: var(--tcds-space-layout-md);padding-block-end:var(--padding-block-end)}.sm\\:margin-block-md{--margin-block-start: var(--tcds-space-layout-md);--margin-block-end: var(--tcds-space-layout-md);--margin-block: var(--margin-block-start) var(--margin-block-end);margin-block-start:var(--margin-block-start);margin-block-end:var(--margin-block-end)}.sm\\:margin-block-start-md{--margin-block-start: var(--tcds-space-layout-md);margin-block-start:var(--margin-block-start)}.sm\\:margin-block-end-md{--margin-block-end: var(--tcds-space-layout-md);margin-block-end:var(--margin-block-end)}.sm\\:padding-block-lg{--padding-block-start: var(--tcds-space-layout-lg);--padding-block-end: var(--tcds-space-layout-lg);--padding-block: var(--padding-block-start) var(--padding-block-end);padding-block-start:var(--padding-block-start);padding-block-end:var(--padding-block-end)}.sm\\:padding-block-start-lg{--padding-block-start: var(--tcds-space-layout-lg);padding-block-start:var(--padding-block-start)}.sm\\:padding-block-end-lg{--padding-block-end: var(--tcds-space-layout-lg);padding-block-end:var(--padding-block-end)}.sm\\:margin-block-lg{--margin-block-start: var(--tcds-space-layout-lg);--margin-block-end: var(--tcds-space-layout-lg);--margin-block: var(--margin-block-start) var(--margin-block-end);margin-block-start:var(--margin-block-start);margin-block-end:var(--margin-block-end)}.sm\\:margin-block-start-lg{--margin-block-start: var(--tcds-space-layout-lg);margin-block-start:var(--margin-block-start)}.sm\\:margin-block-end-lg{--margin-block-end: var(--tcds-space-layout-lg);margin-block-end:var(--margin-block-end)}.sm\\:padding-block-xl{--padding-block-start: var(--tcds-space-layout-xl);--padding-block-end: var(--tcds-space-layout-xl);--padding-block: var(--padding-block-start) var(--padding-block-end);padding-block-start:var(--padding-block-start);padding-block-end:var(--padding-block-end)}.sm\\:padding-block-start-xl{--padding-block-start: var(--tcds-space-layout-xl);padding-block-start:var(--padding-block-start)}.sm\\:padding-block-end-xl{--padding-block-end: var(--tcds-space-layout-xl);padding-block-end:var(--padding-block-end)}.sm\\:margin-block-xl{--margin-block-start: var(--tcds-space-layout-xl);--margin-block-end: var(--tcds-space-layout-xl);--margin-block: var(--margin-block-start) var(--margin-block-end);margin-block-start:var(--margin-block-start);margin-block-end:var(--margin-block-end)}.sm\\:margin-block-start-xl{--margin-block-start: var(--tcds-space-layout-xl);margin-block-start:var(--margin-block-start)}.sm\\:margin-block-end-xl{--margin-block-end: var(--tcds-space-layout-xl);margin-block-end:var(--margin-block-end)}}@media(min-width: 960px){.md\\:padding-block-xs{--padding-block-start: var(--tcds-space-layout-xs);--padding-block-end: var(--tcds-space-layout-xs);--padding-block: var(--padding-block-start) var(--padding-block-end);padding-block-start:var(--padding-block-start);padding-block-end:var(--padding-block-end)}.md\\:padding-block-start-xs{--padding-block-start: var(--tcds-space-layout-xs);padding-block-start:var(--padding-block-start)}.md\\:padding-block-end-xs{--padding-block-end: var(--tcds-space-layout-xs);padding-block-end:var(--padding-block-end)}.md\\:margin-block-xs{--margin-block-start: var(--tcds-space-layout-xs);--margin-block-end: var(--tcds-space-layout-xs);--margin-block: var(--margin-block-start) var(--margin-block-end);margin-block-start:var(--margin-block-start);margin-block-end:var(--margin-block-end)}.md\\:margin-block-start-xs{--margin-block-start: var(--tcds-space-layout-xs);margin-block-start:var(--margin-block-start)}.md\\:margin-block-end-xs{--margin-block-end: var(--tcds-space-layout-xs);margin-block-end:var(--margin-block-end)}.md\\:padding-block-sm{--padding-block-start: var(--tcds-space-layout-sm);--padding-block-end: var(--tcds-space-layout-sm);--padding-block: var(--padding-block-start) var(--padding-block-end);padding-block-start:var(--padding-block-start);padding-block-end:var(--padding-block-end)}.md\\:padding-block-start-sm{--padding-block-start: var(--tcds-space-layout-sm);padding-block-start:var(--padding-block-start)}.md\\:padding-block-end-sm{--padding-block-end: var(--tcds-space-layout-sm);padding-block-end:var(--padding-block-end)}.md\\:margin-block-sm{--margin-block-start: var(--tcds-space-layout-sm);--margin-block-end: var(--tcds-space-layout-sm);--margin-block: var(--margin-block-start) var(--margin-block-end);margin-block-start:var(--margin-block-start);margin-block-end:var(--margin-block-end)}.md\\:margin-block-start-sm{--margin-block-start: var(--tcds-space-layout-sm);margin-block-start:var(--margin-block-start)}.md\\:margin-block-end-sm{--margin-block-end: var(--tcds-space-layout-sm);margin-block-end:var(--margin-block-end)}.md\\:padding-block-md{--padding-block-start: var(--tcds-space-layout-md);--padding-block-end: var(--tcds-space-layout-md);--padding-block: var(--padding-block-start) var(--padding-block-end);padding-block-start:var(--padding-block-start);padding-block-end:var(--padding-block-end)}.md\\:padding-block-start-md{--padding-block-start: var(--tcds-space-layout-md);padding-block-start:var(--padding-block-start)}.md\\:padding-block-end-md{--padding-block-end: var(--tcds-space-layout-md);padding-block-end:var(--padding-block-end)}.md\\:margin-block-md{--margin-block-start: var(--tcds-space-layout-md);--margin-block-end: var(--tcds-space-layout-md);--margin-block: var(--margin-block-start) var(--margin-block-end);margin-block-start:var(--margin-block-start);margin-block-end:var(--margin-block-end)}.md\\:margin-block-start-md{--margin-block-start: var(--tcds-space-layout-md);margin-block-start:var(--margin-block-start)}.md\\:margin-block-end-md{--margin-block-end: var(--tcds-space-layout-md);margin-block-end:var(--margin-block-end)}.md\\:padding-block-lg{--padding-block-start: var(--tcds-space-layout-lg);--padding-block-end: var(--tcds-space-layout-lg);--padding-block: var(--padding-block-start) var(--padding-block-end);padding-block-start:var(--padding-block-start);padding-block-end:var(--padding-block-end)}.md\\:padding-block-start-lg{--padding-block-start: var(--tcds-space-layout-lg);padding-block-start:var(--padding-block-start)}.md\\:padding-block-end-lg{--padding-block-end: var(--tcds-space-layout-lg);padding-block-end:var(--padding-block-end)}.md\\:margin-block-lg{--margin-block-start: var(--tcds-space-layout-lg);--margin-block-end: var(--tcds-space-layout-lg);--margin-block: var(--margin-block-start) var(--margin-block-end);margin-block-start:var(--margin-block-start);margin-block-end:var(--margin-block-end)}.md\\:margin-block-start-lg{--margin-block-start: var(--tcds-space-layout-lg);margin-block-start:var(--margin-block-start)}.md\\:margin-block-end-lg{--margin-block-end: var(--tcds-space-layout-lg);margin-block-end:var(--margin-block-end)}.md\\:padding-block-xl{--padding-block-start: var(--tcds-space-layout-xl);--padding-block-end: var(--tcds-space-layout-xl);--padding-block: var(--padding-block-start) var(--padding-block-end);padding-block-start:var(--padding-block-start);padding-block-end:var(--padding-block-end)}.md\\:padding-block-start-xl{--padding-block-start: var(--tcds-space-layout-xl);padding-block-start:var(--padding-block-start)}.md\\:padding-block-end-xl{--padding-block-end: var(--tcds-space-layout-xl);padding-block-end:var(--padding-block-end)}.md\\:margin-block-xl{--margin-block-start: var(--tcds-space-layout-xl);--margin-block-end: var(--tcds-space-layout-xl);--margin-block: var(--margin-block-start) var(--margin-block-end);margin-block-start:var(--margin-block-start);margin-block-end:var(--margin-block-end)}.md\\:margin-block-start-xl{--margin-block-start: var(--tcds-space-layout-xl);margin-block-start:var(--margin-block-start)}.md\\:margin-block-end-xl{--margin-block-end: var(--tcds-space-layout-xl);margin-block-end:var(--margin-block-end)}}@media(min-width: 1312px){.lg\\:padding-block-xs{--padding-block-start: var(--tcds-space-layout-xs);--padding-block-end: var(--tcds-space-layout-xs);--padding-block: var(--padding-block-start) var(--padding-block-end);padding-block-start:var(--padding-block-start);padding-block-end:var(--padding-block-end)}.lg\\:padding-block-start-xs{--padding-block-start: var(--tcds-space-layout-xs);padding-block-start:var(--padding-block-start)}.lg\\:padding-block-end-xs{--padding-block-end: var(--tcds-space-layout-xs);padding-block-end:var(--padding-block-end)}.lg\\:margin-block-xs{--margin-block-start: var(--tcds-space-layout-xs);--margin-block-end: var(--tcds-space-layout-xs);--margin-block: var(--margin-block-start) var(--margin-block-end);margin-block-start:var(--margin-block-start);margin-block-end:var(--margin-block-end)}.lg\\:margin-block-start-xs{--margin-block-start: var(--tcds-space-layout-xs);margin-block-start:var(--margin-block-start)}.lg\\:margin-block-end-xs{--margin-block-end: var(--tcds-space-layout-xs);margin-block-end:var(--margin-block-end)}.lg\\:padding-block-sm{--padding-block-start: var(--tcds-space-layout-sm);--padding-block-end: var(--tcds-space-layout-sm);--padding-block: var(--padding-block-start) var(--padding-block-end);padding-block-start:var(--padding-block-start);padding-block-end:var(--padding-block-end)}.lg\\:padding-block-start-sm{--padding-block-start: var(--tcds-space-layout-sm);padding-block-start:var(--padding-block-start)}.lg\\:padding-block-end-sm{--padding-block-end: var(--tcds-space-layout-sm);padding-block-end:var(--padding-block-end)}.lg\\:margin-block-sm{--margin-block-start: var(--tcds-space-layout-sm);--margin-block-end: var(--tcds-space-layout-sm);--margin-block: var(--margin-block-start) var(--margin-block-end);margin-block-start:var(--margin-block-start);margin-block-end:var(--margin-block-end)}.lg\\:margin-block-start-sm{--margin-block-start: var(--tcds-space-layout-sm);margin-block-start:var(--margin-block-start)}.lg\\:margin-block-end-sm{--margin-block-end: var(--tcds-space-layout-sm);margin-block-end:var(--margin-block-end)}.lg\\:padding-block-md{--padding-block-start: var(--tcds-space-layout-md);--padding-block-end: var(--tcds-space-layout-md);--padding-block: var(--padding-block-start) var(--padding-block-end);padding-block-start:var(--padding-block-start);padding-block-end:var(--padding-block-end)}.lg\\:padding-block-start-md{--padding-block-start: var(--tcds-space-layout-md);padding-block-start:var(--padding-block-start)}.lg\\:padding-block-end-md{--padding-block-end: var(--tcds-space-layout-md);padding-block-end:var(--padding-block-end)}.lg\\:margin-block-md{--margin-block-start: var(--tcds-space-layout-md);--margin-block-end: var(--tcds-space-layout-md);--margin-block: var(--margin-block-start) var(--margin-block-end);margin-block-start:var(--margin-block-start);margin-block-end:var(--margin-block-end)}.lg\\:margin-block-start-md{--margin-block-start: var(--tcds-space-layout-md);margin-block-start:var(--margin-block-start)}.lg\\:margin-block-end-md{--margin-block-end: var(--tcds-space-layout-md);margin-block-end:var(--margin-block-end)}.lg\\:padding-block-lg{--padding-block-start: var(--tcds-space-layout-lg);--padding-block-end: var(--tcds-space-layout-lg);--padding-block: var(--padding-block-start) var(--padding-block-end);padding-block-start:var(--padding-block-start);padding-block-end:var(--padding-block-end)}.lg\\:padding-block-start-lg{--padding-block-start: var(--tcds-space-layout-lg);padding-block-start:var(--padding-block-start)}.lg\\:padding-block-end-lg{--padding-block-end: var(--tcds-space-layout-lg);padding-block-end:var(--padding-block-end)}.lg\\:margin-block-lg{--margin-block-start: var(--tcds-space-layout-lg);--margin-block-end: var(--tcds-space-layout-lg);--margin-block: var(--margin-block-start) var(--margin-block-end);margin-block-start:var(--margin-block-start);margin-block-end:var(--margin-block-end)}.lg\\:margin-block-start-lg{--margin-block-start: var(--tcds-space-layout-lg);margin-block-start:var(--margin-block-start)}.lg\\:margin-block-end-lg{--margin-block-end: var(--tcds-space-layout-lg);margin-block-end:var(--margin-block-end)}.lg\\:padding-block-xl{--padding-block-start: var(--tcds-space-layout-xl);--padding-block-end: var(--tcds-space-layout-xl);--padding-block: var(--padding-block-start) var(--padding-block-end);padding-block-start:var(--padding-block-start);padding-block-end:var(--padding-block-end)}.lg\\:padding-block-start-xl{--padding-block-start: var(--tcds-space-layout-xl);padding-block-start:var(--padding-block-start)}.lg\\:padding-block-end-xl{--padding-block-end: var(--tcds-space-layout-xl);padding-block-end:var(--padding-block-end)}.lg\\:margin-block-xl{--margin-block-start: var(--tcds-space-layout-xl);--margin-block-end: var(--tcds-space-layout-xl);--margin-block: var(--margin-block-start) var(--margin-block-end);margin-block-start:var(--margin-block-start);margin-block-end:var(--margin-block-end)}.lg\\:margin-block-start-xl{--margin-block-start: var(--tcds-space-layout-xl);margin-block-start:var(--margin-block-start)}.lg\\:margin-block-end-xl{--margin-block-end: var(--tcds-space-layout-xl);margin-block-end:var(--margin-block-end)}}@media(min-width: 1920px){.xl\\:padding-block-xs{--padding-block-start: var(--tcds-space-layout-xs);--padding-block-end: var(--tcds-space-layout-xs);--padding-block: var(--padding-block-start) var(--padding-block-end);padding-block-start:var(--padding-block-start);padding-block-end:var(--padding-block-end)}.xl\\:padding-block-start-xs{--padding-block-start: var(--tcds-space-layout-xs);padding-block-start:var(--padding-block-start)}.xl\\:padding-block-end-xs{--padding-block-end: var(--tcds-space-layout-xs);padding-block-end:var(--padding-block-end)}.xl\\:margin-block-xs{--margin-block-start: var(--tcds-space-layout-xs);--margin-block-end: var(--tcds-space-layout-xs);--margin-block: var(--margin-block-start) var(--margin-block-end);margin-block-start:var(--margin-block-start);margin-block-end:var(--margin-block-end)}.xl\\:margin-block-start-xs{--margin-block-start: var(--tcds-space-layout-xs);margin-block-start:var(--margin-block-start)}.xl\\:margin-block-end-xs{--margin-block-end: var(--tcds-space-layout-xs);margin-block-end:var(--margin-block-end)}.xl\\:padding-block-sm{--padding-block-start: var(--tcds-space-layout-sm);--padding-block-end: var(--tcds-space-layout-sm);--padding-block: var(--padding-block-start) var(--padding-block-end);padding-block-start:var(--padding-block-start);padding-block-end:var(--padding-block-end)}.xl\\:padding-block-start-sm{--padding-block-start: var(--tcds-space-layout-sm);padding-block-start:var(--padding-block-start)}.xl\\:padding-block-end-sm{--padding-block-end: var(--tcds-space-layout-sm);padding-block-end:var(--padding-block-end)}.xl\\:margin-block-sm{--margin-block-start: var(--tcds-space-layout-sm);--margin-block-end: var(--tcds-space-layout-sm);--margin-block: var(--margin-block-start) var(--margin-block-end);margin-block-start:var(--margin-block-start);margin-block-end:var(--margin-block-end)}.xl\\:margin-block-start-sm{--margin-block-start: var(--tcds-space-layout-sm);margin-block-start:var(--margin-block-start)}.xl\\:margin-block-end-sm{--margin-block-end: var(--tcds-space-layout-sm);margin-block-end:var(--margin-block-end)}.xl\\:padding-block-md{--padding-block-start: var(--tcds-space-layout-md);--padding-block-end: var(--tcds-space-layout-md);--padding-block: var(--padding-block-start) var(--padding-block-end);padding-block-start:var(--padding-block-start);padding-block-end:var(--padding-block-end)}.xl\\:padding-block-start-md{--padding-block-start: var(--tcds-space-layout-md);padding-block-start:var(--padding-block-start)}.xl\\:padding-block-end-md{--padding-block-end: var(--tcds-space-layout-md);padding-block-end:var(--padding-block-end)}.xl\\:margin-block-md{--margin-block-start: var(--tcds-space-layout-md);--margin-block-end: var(--tcds-space-layout-md);--margin-block: var(--margin-block-start) var(--margin-block-end);margin-block-start:var(--margin-block-start);margin-block-end:var(--margin-block-end)}.xl\\:margin-block-start-md{--margin-block-start: var(--tcds-space-layout-md);margin-block-start:var(--margin-block-start)}.xl\\:margin-block-end-md{--margin-block-end: var(--tcds-space-layout-md);margin-block-end:var(--margin-block-end)}.xl\\:padding-block-lg{--padding-block-start: var(--tcds-space-layout-lg);--padding-block-end: var(--tcds-space-layout-lg);--padding-block: var(--padding-block-start) var(--padding-block-end);padding-block-start:var(--padding-block-start);padding-block-end:var(--padding-block-end)}.xl\\:padding-block-start-lg{--padding-block-start: var(--tcds-space-layout-lg);padding-block-start:var(--padding-block-start)}.xl\\:padding-block-end-lg{--padding-block-end: var(--tcds-space-layout-lg);padding-block-end:var(--padding-block-end)}.xl\\:margin-block-lg{--margin-block-start: var(--tcds-space-layout-lg);--margin-block-end: var(--tcds-space-layout-lg);--margin-block: var(--margin-block-start) var(--margin-block-end);margin-block-start:var(--margin-block-start);margin-block-end:var(--margin-block-end)}.xl\\:margin-block-start-lg{--margin-block-start: var(--tcds-space-layout-lg);margin-block-start:var(--margin-block-start)}.xl\\:margin-block-end-lg{--margin-block-end: var(--tcds-space-layout-lg);margin-block-end:var(--margin-block-end)}.xl\\:padding-block-xl{--padding-block-start: var(--tcds-space-layout-xl);--padding-block-end: var(--tcds-space-layout-xl);--padding-block: var(--padding-block-start) var(--padding-block-end);padding-block-start:var(--padding-block-start);padding-block-end:var(--padding-block-end)}.xl\\:padding-block-start-xl{--padding-block-start: var(--tcds-space-layout-xl);padding-block-start:var(--padding-block-start)}.xl\\:padding-block-end-xl{--padding-block-end: var(--tcds-space-layout-xl);padding-block-end:var(--padding-block-end)}.xl\\:margin-block-xl{--margin-block-start: var(--tcds-space-layout-xl);--margin-block-end: var(--tcds-space-layout-xl);--margin-block: var(--margin-block-start) var(--margin-block-end);margin-block-start:var(--margin-block-start);margin-block-end:var(--margin-block-end)}.xl\\:margin-block-start-xl{--margin-block-start: var(--tcds-space-layout-xl);margin-block-start:var(--margin-block-start)}.xl\\:margin-block-end-xl{--margin-block-end: var(--tcds-space-layout-xl);margin-block-end:var(--margin-block-end)}}.margin-inline-auto{margin-inline:auto !important}.margin-inline-start-auto{margin-inline-start:auto !important}.margin-inline-end-auto{margin-inline-end:auto !important}@media(min-width: 320px){.xs\\:margin-inline-auto{margin-inline:auto !important}.xs\\:margin-inline-start-auto{margin-inline-start:auto !important}.xs\\:margin-inline-end-auto{margin-inline-end:auto !important}}@media(min-width: 640px){.sm\\:margin-inline-auto{margin-inline:auto !important}.sm\\:margin-inline-start-auto{margin-inline-start:auto !important}.sm\\:margin-inline-end-auto{margin-inline-end:auto !important}}@media(min-width: 960px){.md\\:margin-inline-auto{margin-inline:auto !important}.md\\:margin-inline-start-auto{margin-inline-start:auto !important}.md\\:margin-inline-end-auto{margin-inline-end:auto !important}}@media(min-width: 1312px){.lg\\:margin-inline-auto{margin-inline:auto !important}.lg\\:margin-inline-start-auto{margin-inline-start:auto !important}.lg\\:margin-inline-end-auto{margin-inline-end:auto !important}}@media(min-width: 1920px){.xl\\:margin-inline-auto{margin-inline:auto !important}.xl\\:margin-inline-start-auto{margin-inline-start:auto !important}.xl\\:margin-inline-end-auto{margin-inline-end:auto !important}}.text-display-1{font:700 3rem/1.06 Fraunces,serif !important}@media(width >= 960px){.text-display-1{font:700 8rem/1.06 Fraunces,serif !important}}.text-display-2{font:700 2.25rem/1.06 Fraunces,serif !important}@media(width >= 960px){.text-display-2{font:700 6rem/1.06 Fraunces,serif !important}}.text-heading-1{font:2.25rem/1.06 Fraunces,serif !important}@media(width >= 960px){.text-heading-1{font:4.5rem/1.06 Fraunces,serif !important}}.text-heading-2{font:1.5rem/1.33 Fraunces,serif !important}@media(width >= 960px){.text-heading-2{font:3.75rem/1.06 Fraunces,serif !important}}.text-heading-3{font:1.25rem/1.33 Fraunces,serif !important}@media(width >= 960px){.text-heading-3{font:3rem/1.06 Fraunces,serif !important}}.text-heading-4{font:1.125rem/1.33 Fraunces,serif !important}@media(width >= 960px){.text-heading-4{font:2.25rem/1.33 Fraunces,serif !important}}.text-body-lg{font:400 1.125rem/1.66 Poppins,system-ui,sans-serif !important}.text-body-md{font:400 1rem/1.66 Poppins,system-ui,sans-serif !important}.text-body-sm{font:400 .875rem/1.66 Poppins,system-ui,sans-serif !important}.text-body-xs{font:400 .75rem/1.66 Poppins,system-ui,sans-serif !important}.text-ui-lg{font:600 1.125rem/1.66 Poppins,system-ui,sans-serif !important}.text-ui-md{font:600 1rem/1.66 Poppins,system-ui,sans-serif !important}.text-ui-sm{font:600 .875rem/1.66 Poppins,system-ui,sans-serif !important}.font-family-display{font-family:var(--tcds-font-family-display) !important;font-weight:var(--tcds-font-weight-display)}.font-family-body{font-family:var(--tcds-font-family-body) !important;font-weight:var(--tcds-font-weight-body)}.font-family-ui{font-family:var(--tcds-font-family-ui) !important;font-weight:var(--tcds-font-weight-ui)}.font-family-sans-serif{font-family:var(--tcds-font-stack-sans-serif) !important}.font-family-serif{font-family:var(--tcds-font-stack-serif) !important}.text-align-center{text-align:center !important}.text-align-left,.text-align-inline-start{text-align:inline-start !important}@media(min-width: 320px){.xs\\:text-align-center{text-align:center !important}.xs\\:text-align-left,.xs\\:text-align-inline-start{text-align:inline-start !important}}@media(min-width: 640px){.sm\\:text-align-center{text-align:center !important}.sm\\:text-align-left,.sm\\:text-align-inline-start{text-align:inline-start !important}}@media(min-width: 960px){.md\\:text-align-center{text-align:center !important}.md\\:text-align-left,.md\\:text-align-inline-start{text-align:inline-start !important}}@media(min-width: 1312px){.lg\\:text-align-center{text-align:center !important}.lg\\:text-align-left,.lg\\:text-align-inline-start{text-align:inline-start !important}}@media(min-width: 1920px){.xl\\:text-align-center{text-align:center !important}.xl\\:text-align-left,.xl\\:text-align-inline-start{text-align:inline-start !important}}.font-variant-tabular-nums{font-variant-numeric:lining-nums tabular-nums !important}}/*# sourceMappingURL=shared.css.map */
`;

var _templateObject$3;
function _taggedTemplateLiteral$3(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var disclosureStyles = i(_templateObject$3 || (_templateObject$3 = _taggedTemplateLiteral$3(["\n  :host {\n  }\n\n  :host(:not([hidden])) {\n    display: block;\n  }\n\n  /**\n   * In tabs mode the group's tablist supplies the label, so the author's\n   * heading is suppressed here to keep it from being announced twice.\n   */\n  :host(:state(tabs)) slot[name=title] {\n    display: none;\n  }\n\n  /**\n   * The panel is the tabpanel; hiding the host removes it from layout, the tab\n   * order, and the accessibility tree in one move.\n   */\n  :host(:state(tabs):not(:state(expanded))) {\n    display: none;\n  }\n\n  :host(:state(expanded)) {\n  }\n\n  [part=heading] {\n    border-bottom: 1px solid var(--tcds-color-theme-edge);\n  }\n\n  [part=trigger] {\n    appearance: none;\n    background-color: transparent;\n    border: 0;\n    display: flex;\n    justify-content: space-between;\n    width: 100%;\n    padding: var(--tcds-space-component-sm) 0;\n    font-family: var(--tcds-font-family-ui);\n    font-weight: var(--tcds-font-weight-ui);\n    font-size: var(--tcds-font-size-2xl);\n    cursor: pointer;\n  }\n\n  [part=marker] {\n    flex-shrink: 0;\n  }\n\n  [part=marker] {\n    flex: none;\n  }\n\n  /**\n   * Required for the height animation to clip. The panel is set back to\n   * 'height: auto' once open, so this only bites during the transition.\n   */\n  [part=panel] {\n    overflow: hidden;\n  }\n\n  [part=panel]:focus-visible {\n    outline: 2px solid currentcolor;\n    outline-offset: 2px;\n  }\n\n  [part=content] {\n    padding-block: var(--tcds-space-component-md);\n  }\n\n  :host(:state(plain)) [part=content] {\n    padding-block-start: 0;\n  }\n"])));

var SizeBreakpointMd="960px";// Medium (960px)
var MotionEasingTranslate="cubic-bezier(0.42, 0, 0.58, 1)";// ease-in-out
var MotionEasingEnter="cubic-bezier(0, 0, 0.2, 1)";// ease-out
var MotionEasingExit="cubic-bezier(0.4, 0, 1, 1)";// ease-in
var MotionDurationProductive=100;

function _typeof$4(o) { "@babel/helpers - typeof"; return _typeof$4 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$4(o); }
function _classCallCheck$4(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties$4(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey$4(o.key), o); } }
function _createClass$4(e, r, t) { return r && _defineProperties$4(e.prototype, r), Object.defineProperty(e, "prototype", { writable: false }), e; }
function _toPropertyKey$4(t) { var i = _toPrimitive$4(t, "string"); return "symbol" == _typeof$4(i) ? i : i + ""; }
function _toPrimitive$4(t, r) { if ("object" != _typeof$4(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r); if ("object" != _typeof$4(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return (String )(t); }
function _classPrivateMethodInitSpec$3(e, a) { _checkPrivateRedeclaration$4(e, a), a.add(e); }
function _classPrivateFieldInitSpec$4(e, t, a) { _checkPrivateRedeclaration$4(e, t), t.set(e, a); }
function _checkPrivateRedeclaration$4(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _classPrivateFieldGet$4(s, a) { return s.get(_assertClassBrand$4(s, a)); }
function _classPrivateFieldSet$4(s, a, r) { return s.set(_assertClassBrand$4(s, a), r), r; }
function _assertClassBrand$4(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
var _config = /*#__PURE__*/new WeakMap();
var _previousOpen = /*#__PURE__*/new WeakMap();
var _AccordionAnimationController_brand = /*#__PURE__*/new WeakSet();
var AccordionAnimationController = /*#__PURE__*/function () {
  /**
   * @param {ReactiveElement} host
   * @param {Object} config
   * @param {() => boolean} config.isOpen - Getter for current open state.
   * @param {() => HTMLElement} config.getPanel - Getter for panel element.
   * @param {() => HTMLElement} config.getContent - Getter for content element.
   */
  function AccordionAnimationController(host, config) {
    _classCallCheck$4(this, AccordionAnimationController);
    _classPrivateMethodInitSpec$3(this, _AccordionAnimationController_brand);
    _classPrivateFieldInitSpec$4(this, _config, void 0);
    _classPrivateFieldInitSpec$4(this, _previousOpen, undefined);
    _classPrivateFieldSet$4(_config, this, config);
    host.addController(this);
  }
  return _createClass$4(AccordionAnimationController, [{
    key: "reset",
    value:
    /**
     * Discards the remembered state, so the next `hostUpdated` re-runs the
     * initial-render branch and re-establishes `hidden` without animating. For
     * hosts that disable the controller (by returning a null panel) and later
     * re-enable it, during which time the DOM may have been changed underneath.
     */
    function reset() {
      _classPrivateFieldSet$4(_previousOpen, this, undefined);
    }
  }, {
    key: "hostUpdated",
    value: function hostUpdated() {
      var isOpen = _classPrivateFieldGet$4(_config, this).isOpen();
      var panel = _classPrivateFieldGet$4(_config, this).getPanel();
      var content = _classPrivateFieldGet$4(_config, this).getContent();
      if (!panel || !content) return;

      // Initial render - no animation, just set state.
      if (_classPrivateFieldGet$4(_previousOpen, this) === undefined) {
        // `[hidden=until-found]` keeps the content discoverable by browser text
        // search (cmd/ctrl+F).
        if (!isOpen) panel.hidden = "until-found";
        _classPrivateFieldSet$4(_previousOpen, this, isOpen);
        return;
      }
      if (isOpen === _classPrivateFieldGet$4(_previousOpen, this)) return;
      _assertClassBrand$4(_AccordionAnimationController_brand, this, _animate).call(this, isOpen, panel, content);
      _classPrivateFieldSet$4(_previousOpen, this, isOpen);
    }
  }]);
}();
function _animate(isOpen, panel, content) {
  // If user has reduced-motion preference, disable animations by setting
  // duration to 1ms.
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var duration = reducedMotion ? 1 : MotionDurationProductive;
  if (isOpen) {
    panel.hidden = false;

    // After animation, we set panel height to auto so it can respond to new
    // elements that add/grow after opening (like nested accordions).
    panel.animate({
      height: ["0", "".concat(panel.scrollHeight, "px")]
    }, {
      duration: duration,
      easing: MotionEasingTranslate
    }).onfinish = function () {
      return panel.style.height = "auto";
    };

    // Small tertiary animation for the content to add smoothness.
    content.animate({
      opacity: [0, 1],
      translate: ["0 -15%", "0 0"]
    }, {
      duration: duration,
      easing: MotionEasingEnter
    });
  } else {
    // Reverse animation, reset DOM.
    panel.animate({
      height: ["".concat(panel.scrollHeight, "px"), "0"]
    }, {
      duration: duration,
      easing: MotionEasingTranslate
    }).onfinish = function () {
      panel.hidden = "until-found";
      panel.style.height = null;
    };
    content.animate({
      opacity: [1, 0],
      translate: ["0 0", "0 -15%"]
    }, {
      duration: duration,
      easing: MotionEasingExit
    });
  }
}

function _typeof$3(o) { "@babel/helpers - typeof"; return _typeof$3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$3(o); }
var _Disclosure, _templateObject$2, _templateObject2, _templateObject3;
var _init_mode, _init_extra_mode, _init_position, _init_extra_position, _init_total, _init_extra_total;
function _slicedToArray$1(r, e) { return _arrayWithHoles$1(r) || _iterableToArrayLimit$1(r, e) || _unsupportedIterableToArray$1(r, e) || _nonIterableRest$1(); }
function _nonIterableRest$1() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$1(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray$1(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$1(r, a) : void 0; } }
function _arrayLikeToArray$1(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit$1(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = true, o = false; try { if (i = (t = t.call(r)).next, 0 === l) ; else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = true, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles$1(r) { if (Array.isArray(r)) return r; }
function _taggedTemplateLiteral$2(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
function _classCallCheck$3(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties$3(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey$3(o.key), o); } }
function _createClass$3(e, r, t) { return r && _defineProperties$3(e.prototype, r), Object.defineProperty(e, "prototype", { writable: false }), e; }
function _callSuper$1(t, o, e) { return o = _getPrototypeOf$1(o), _possibleConstructorReturn$1(t, _isNativeReflectConstruct$1() ? Reflect.construct(o, [], _getPrototypeOf$1(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn$1(t, e) { if (e && ("object" == _typeof$3(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized$1(t); }
function _assertThisInitialized$1(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct$1() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct$1 = function _isNativeReflectConstruct() { return !!t; })(); }
function _superPropGet$1(t, o, e, r) { var p = _get$1(_getPrototypeOf$1(t.prototype ), o, e); return "function" == typeof p ? function (t) { return p.apply(e, t); } : p; }
function _get$1() { return _get$1 = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase$1(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get$1.apply(null, arguments); }
function _superPropBase$1(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf$1(t));); return t; }
function _getPrototypeOf$1(t) { return _getPrototypeOf$1 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf$1(t); }
function _inherits$1(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: true, configurable: true } }), Object.defineProperty(t, "prototype", { writable: false }), e && _setPrototypeOf$1(t, e); }
function _setPrototypeOf$1(t, e) { return _setPrototypeOf$1 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf$1(t, e); }
function _classPrivateMethodInitSpec$2(e, a) { _checkPrivateRedeclaration$3(e, a), a.add(e); }
function _classPrivateFieldInitSpec$3(e, t, a) { _checkPrivateRedeclaration$3(e, t), t.set(e, a); }
function _checkPrivateRedeclaration$3(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _defineProperty$1(e, r, t) { return (r = _toPropertyKey$3(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e; }
function _classPrivateGetter$1(s, r, a) { return a(_assertClassBrand$3(s, r)); }
function _classPrivateFieldSet$3(s, a, r) { return s.set(_assertClassBrand$3(s, a), r), r; }
function _classPrivateFieldGet$3(s, a) { return s.get(_assertClassBrand$3(s, a)); }
function _assertClassBrand$3(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
function _applyDecs$1(e, t, n, r, o, i) { var a, c, u, s, f, l, p, d = Symbol.metadata || Symbol["for"]("Symbol.metadata"), m = Object.defineProperty, h = Object.create, y = [h(null), h(null)], v = t.length; function g(t, n, r) { return function (o, i) { n && (i = o, o = e); for (var a = 0; a < t.length; a++) i = t[a].apply(o, r ? [i] : []); return r ? i : o; }; } function b(e, t, n, r) { if ("function" != typeof e && (r || void 0 !== e)) throw new TypeError(t + " must " + (n || "be") + " a function" + (r ? "" : " or undefined")); return e; } function applyDec(e, t, n, r, o, i, u, s, f, l, p) { function d(e) { if (!p(e)) throw new TypeError("Attempted to access private element on non-instance"); } var h = [].concat(t[0]), v = t[3], w = !u, D = 1 === o, S = 3 === o, j = 4 === o, E = 2 === o; function I(t, n, r) { return function (o, i) { return n && (i = o, o = e), r && r(o), P[t].call(o, i); }; } if (!w) { var P = {}, k = [], F = S ? "get" : j || D ? "set" : "value"; if (f ? (l || D ? P = { get: _setFunctionName$1(function () { return v(this); }, r, "get"), set: function set(e) { t[4](this, e); } } : P[F] = v, l || _setFunctionName$1(P[F], r, E ? "" : F)) : l || (P = Object.getOwnPropertyDescriptor(e, r)), !l && !f) { if ((c = y[+s][r]) && 7 !== (c ^ o)) throw Error("Decorating two elements with the same name (" + P[F].name + ") is not supported yet"); y[+s][r] = o < 3 ? 1 : o; } } for (var N = e, O = h.length - 1; O >= 0; O -= n ? 2 : 1) { var T = b(h[O], "A decorator", "be", true), z = n ? h[O - 1] : void 0, A = {}, H = { kind: ["field", "accessor", "method", "getter", "setter", "class"][o], name: r, metadata: a, addInitializer: function (e, t) { if (e.v) throw new TypeError("attempted to call addInitializer after decoration was finished"); b(t, "An initializer", "be", true), i.push(t); }.bind(null, A) }; if (w) c = T.call(z, N, H), A.v = 1, b(c, "class decorators", "return") && (N = c);else if (H["static"] = s, H["private"] = f, c = H.access = { has: f ? p.bind() : function (e) { return r in e; } }, j || (c.get = f ? E ? function (e) { return d(e), P.value; } : I("get", 0, d) : function (e) { return e[r]; }), E || S || (c.set = f ? I("set", 0, d) : function (e, t) { e[r] = t; }), N = T.call(z, D ? { get: P.get, set: P.set } : P[F], H), A.v = 1, D) { if ("object" == _typeof$3(N) && N) (c = b(N.get, "accessor.get")) && (P.get = c), (c = b(N.set, "accessor.set")) && (P.set = c), (c = b(N.init, "accessor.init")) && k.unshift(c);else if (void 0 !== N) throw new TypeError("accessor decorators must return an object with get, set, or init properties or undefined"); } else b(N, (l ? "field" : "method") + " decorators", "return") && (l ? k.unshift(N) : P[F] = N); } return o < 2 && u.push(g(k, s, 1), g(i, s, 0)), l || w || (f ? D ? u.splice(-1, 0, I("get", s), I("set", s)) : u.push(E ? P[F] : b.call.bind(P[F])) : m(e, r, P)), N; } function w(e) { return m(e, d, { configurable: true, enumerable: true, value: a }); } return void 0 !== i && (a = i[d]), a = h(null == a ? null : a), f = [], l = function l(e) { e && f.push(g(e)); }, p = function p(t, r) { for (var i = 0; i < n.length; i++) { var a = n[i], c = a[1], l = 7 & c; if ((8 & c) == t && !l == r) { var p = a[2], d = !!a[3], m = 16 & c; applyDec(t ? e : e.prototype, a, m, d ? "#" + p : _toPropertyKey$3(p), l, l < 2 ? [] : t ? s = s || [] : u = u || [], f, !!t, d, r, t && d ? function (t) { return _checkInRHS$1(t) === e; } : o); } } }, p(8, 0), p(0, 0), p(8, 1), p(0, 1), l(u), l(s), c = f, v || w(e), { e: c, get c() { var n = []; return v && [w(e = applyDec(e, [t], r, e.name, 5, n)), g(n, 1)]; } }; }
function _toPropertyKey$3(t) { var i = _toPrimitive$3(t, "string"); return "symbol" == _typeof$3(i) ? i : i + ""; }
function _toPrimitive$3(t, r) { if ("object" != _typeof$3(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r); if ("object" != _typeof$3(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _setFunctionName$1(e, t, n) { "symbol" == _typeof$3(t) && (t = (t = t.description) ? "[" + t + "]" : ""); try { Object.defineProperty(e, "name", { configurable: !0, value: n ? n + " " + t : t }); } catch (e) {} return e; }
function _checkInRHS$1(e) { if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (null !== e ? _typeof$3(e) : "null")); return e; }

/**
 * The presentations an item can take. Assigned by the parent group, mirrored to
 * a custom state so the stylesheet can key off it.
 *   tabs      - Title suppressed (the group's tablist owns it), panel is a
 *               tabpanel, whole host hidden unless expanded.
 *   accordion - Heading wraps a trigger button, panel animates open and shut.
 *   plain     - No affordances at all. Real heading, always-visible content.
 */
var MODES = ["tabs", "accordion", "plain"];
var DEFAULT_HEADING_LEVEL = 3;
var _A$1 = /*#__PURE__*/new WeakMap();
var _B$1 = /*#__PURE__*/new WeakMap();
var _C$1 = /*#__PURE__*/new WeakMap();
var _internals = /*#__PURE__*/new WeakMap();
var _animation = /*#__PURE__*/new WeakMap();
var _Disclosure_brand = /*#__PURE__*/new WeakSet();
var _onBeforeMatch = /*#__PURE__*/new WeakMap();
var Disclosure = /*#__PURE__*/function (_LitElement) {
  // #endregion

  // #region Lifecycle
  function Disclosure() {
    var _this2;
    _classCallCheck$3(this, Disclosure);
    _this2 = _callSuper$1(this, Disclosure);
    // #endregion
    // #region Events
    _classPrivateMethodInitSpec$2(_this2, _Disclosure_brand);
    // #region Properties and state
    _classPrivateFieldInitSpec$3(_this2, _A$1, _init_mode(_this2));
    _classPrivateFieldInitSpec$3(_this2, _B$1, (_init_extra_mode(_this2), _init_position(_this2)));
    _classPrivateFieldInitSpec$3(_this2, _C$1, (_init_extra_position(_this2), _init_total(_this2)));
    // #endregion

    // #region Private variables
    _classPrivateFieldInitSpec$3(_this2, _internals, void _init_extra_total(_this2));
    _classPrivateFieldInitSpec$3(_this2, _animation, void 0);
    _classPrivateFieldInitSpec$3(_this2, _onBeforeMatch, function () {
      _this2.requestChange(true);
    });
    _this2.mode = "accordion";
    _this2.position = 0;
    _this2.total = 1;
    _classPrivateFieldSet$3(_internals, _this2, _this2.attachInternals());

    // Both getters return null outside accordion mode, which makes the
    // controller a no-op where there is nothing to expand or collapse.
    _classPrivateFieldSet$3(_animation, _this2, new AccordionAnimationController(_this2, {
      isOpen: function isOpen() {
        return _this2.expanded;
      },
      getPanel: function getPanel() {
        return _this2.mode === "accordion" ? _this2.panel : null;
      },
      getContent: function getContent() {
        return _this2.mode === "accordion" ? _this2.content : null;
      }
    }));
    return _this2;
  }
  _inherits$1(Disclosure, _LitElement);
  return _createClass$3(Disclosure, [{
    key: "mode",
    get: function get() {
      return _classPrivateFieldGet$3(_A$1, this);
    },
    set: function set(v) {
      _classPrivateFieldSet$3(_A$1, this, v);
    }
  }, {
    key: "position",
    get: function get() {
      return _classPrivateFieldGet$3(_B$1, this);
    },
    set: function set(v) {
      _classPrivateFieldSet$3(_B$1, this, v);
    }
  }, {
    key: "total",
    get: function get() {
      return _classPrivateFieldGet$3(_C$1, this);
    },
    set: function set(v) {
      _classPrivateFieldSet$3(_C$1, this, v);
    }
  }, {
    key: "willUpdate",
    value: function willUpdate(changedProperties) {
      _superPropGet$1(Disclosure, "willUpdate", this)([]);
      if (changedProperties.has("mode")) _classPrivateFieldGet$3(_animation, this).reset();
      for (var _i = 0, _MODES = MODES; _i < _MODES.length; _i++) {
        var mode = _MODES[_i];
        _classPrivateFieldGet$3(_internals, this).states[mode === this.mode ? "add" : "delete"](mode);
      }
      _classPrivateFieldGet$3(_internals, this).states[this.visible ? "add" : "delete"]("expanded");
    }
  }, {
    key: "render",
    value: function render() {
      var _classPrivateGetter2;
      var label = this.titleText;
      return u(_templateObject$2 || (_templateObject$2 = _taggedTemplateLiteral$2(["\n      ", "\n      <div\n        part=\"panel\"\n        id=\"panel\"\n        role=", "\n        tabindex=", "\n        aria-label=", "\n        aria-labelledby=", "\n      >\n        <div part=\"content\">\n          <slot></slot>\n        </div>\n      </div>\n    "])), this.mode === "accordion" ? u(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral$2(["\n        <div part=\"heading\" role=\"heading\" aria-level=", ">\n          <button\n            part=\"trigger\"\n            type=\"button\"\n            id=\"trigger\"\n            aria-expanded=", "\n            aria-controls=\"panel\"\n            @click=", "\n          >\n            <slot name=\"title\"></slot>\n            <tcds-icon part=\"marker\" icon=\"", "\"></tcds-icon>\n          </button>\n        </div>\n      "])), this.headingLevel, this.expanded ? "true" : "false", _assertClassBrand$3(_Disclosure_brand, this, _onTriggerClick), this.expanded ? "minus" : "plus") : u(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral$2(["\n        <slot name=\"title\" @slotchange=", "></slot>\n      "])), _assertClassBrand$3(_Disclosure_brand, this, _onTitleSlotChange)), (_classPrivateGetter2 = _classPrivateGetter$1(_Disclosure_brand, this, _get_panelRole)) !== null && _classPrivateGetter2 !== void 0 ? _classPrivateGetter2 : A, this.mode === "tabs" ? "0" : A, this.mode === "tabs" && label ? label : A, this.mode === "accordion" ? "trigger" : A);
    }
  }, {
    key: "firstUpdated",
    value: function firstUpdated() {
      var _this$panel;
      // `hidden="until-found"` (set by the animation controller when collapsed)
      // lets the browser's find-in-page reveal the panel. The UA removes the
      // attribute itself; this keeps our own state in step with it.
      (_this$panel = this.panel) === null || _this$panel === void 0 || _this$panel.addEventListener("beforematch", _classPrivateFieldGet$3(_onBeforeMatch, this));
    }
  }, {
    key: "updated",
    value: function updated() {
      if (this.mode === "accordion") return;

      // The animation controller owns `hidden` and the inline height, but only in
      // accordion mode. Leaving them behind would keep a panel collapsed after a
      // media query flips the group into another mode.
      var panel = this.panel;
      if (!panel) return;
      panel.hidden = false;
      panel.style.height = null;
    }
    // #endregion

    // #region Public API
    /**
     * Subclasses map this onto their own reflected property — `selected` on tabs,
     * `open` on accordion sections — so each pattern keeps the attribute name
     * that reads naturally in markup.
     */
  }, {
    key: "expanded",
    get: function get() {
      throw new Error("<".concat(this.localName, "> must implement an `expanded` accessor."));
    },
    set: function set(value) {
      throw new Error("<".concat(this.localName, "> must implement an `expanded` accessor."));
    }

    /**
     * Whether the content is actually on screen. Plain mode ignores `expanded`
     * entirely rather than overwriting it, so the author's state survives a trip
     * through a matching media query and back.
     */
  }, {
    key: "visible",
    get: function get() {
      return this.mode === "plain" || this.expanded;
    }

    /**
     * The author's `[slot=title]` element. Scoped to direct children so a nested
     * group's titles are never mistaken for this one's.
     */
  }, {
    key: "titleElement",
    get: function get() {
      return this.querySelector(":scope > [slot=title]");
    }
  }, {
    key: "titleText",
    get: function get() {
      var _this$titleElement$te, _this$titleElement;
      return (_this$titleElement$te = (_this$titleElement = this.titleElement) === null || _this$titleElement === void 0 ? void 0 : _this$titleElement.textContent.trim()) !== null && _this$titleElement$te !== void 0 ? _this$titleElement$te : "";
    }

    /**
     * Taken from the author's heading tag, so `<h2 slot="title">` and
     * `<h4 slot="title">` both survive being wrapped in a trigger button.
     */
  }, {
    key: "headingLevel",
    get: function get() {
      var _title$tagName$match;
      var title = this.titleElement;
      var explicit = Number(title === null || title === void 0 ? void 0 : title.getAttribute("aria-level"));
      if (Number.isInteger(explicit) && explicit > 0) return explicit;
      var level = Number(title === null || title === void 0 || (_title$tagName$match = title.tagName.match(/^H([1-6])$/)) === null || _title$tagName$match === void 0 ? void 0 : _title$tagName$match[1]);
      return Number.isInteger(level) ? level : DEFAULT_HEADING_LEVEL;
    }
  }, {
    key: "panel",
    get: function get() {
      var _this$renderRoot$quer, _this$renderRoot;
      return (_this$renderRoot$quer = (_this$renderRoot = this.renderRoot) === null || _this$renderRoot === void 0 ? void 0 : _this$renderRoot.querySelector("[part=panel]")) !== null && _this$renderRoot$quer !== void 0 ? _this$renderRoot$quer : null;
    }
  }, {
    key: "content",
    get: function get() {
      var _this$renderRoot$quer2, _this$renderRoot2;
      return (_this$renderRoot$quer2 = (_this$renderRoot2 = this.renderRoot) === null || _this$renderRoot2 === void 0 ? void 0 : _this$renderRoot2.querySelector("[part=content]")) !== null && _this$renderRoot$quer2 !== void 0 ? _this$renderRoot$quer2 : null;
    }
  }, {
    key: "requestChange",
    value: function requestChange(expanded) {
      this.dispatchEvent(new CustomEvent("tcds-disclosure-change", {
        detail: {
          expanded: expanded
        },
        bubbles: true,
        composed: true
      }));
    }
    // #endregion
  }]);
}(i$1);
_Disclosure = Disclosure;
function _onTriggerClick() {
  this.requestChange(!this.expanded);
}
function _onTitleSlotChange() {
  // The group may be rendering a copy of this title (a tablist button), so it
  // needs to know when the source text changes.
  this.dispatchEvent(new CustomEvent("tcds-disclosure-title-change", {
    bubbles: true,
    composed: true
  }));
  this.requestUpdate();
}
// #endregion
// #region Utility methods
function _get_panelRole(_this) {
  if (_this.mode === "tabs") return "tabpanel";
  if (_this.mode === "accordion") return "region";
  return null;
}
var _applyDecs$e$1 = _slicedToArray$1(_applyDecs$1(_Disclosure, [], [[n({
  type: String
}), 1, "mode"], [n({
  type: Number
}), 1, "position"], [n({
  type: Number
}), 1, "total"]], 0, void 0, i$1).e, 6);
_init_mode = _applyDecs$e$1[0];
_init_extra_mode = _applyDecs$e$1[1];
_init_position = _applyDecs$e$1[2];
_init_extra_position = _applyDecs$e$1[3];
_init_total = _applyDecs$e$1[4];
_init_extra_total = _applyDecs$e$1[5];
_defineProperty$1(Disclosure, "styles", [styles, disclosureStyles]);

function _typeof$2(o) { "@babel/helpers - typeof"; return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$2(o); }
function _classCallCheck$2(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties$2(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey$2(o.key), o); } }
function _createClass$2(e, r, t) { return r && _defineProperties$2(e.prototype, r), Object.defineProperty(e, "prototype", { writable: false }), e; }
function _toPropertyKey$2(t) { var i = _toPrimitive$2(t, "string"); return "symbol" == _typeof$2(i) ? i : i + ""; }
function _toPrimitive$2(t, r) { if ("object" != _typeof$2(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r); if ("object" != _typeof$2(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return (String )(t); }
function _classPrivateMethodInitSpec$1(e, a) { _checkPrivateRedeclaration$2(e, a), a.add(e); }
function _classPrivateFieldInitSpec$2(e, t, a) { _checkPrivateRedeclaration$2(e, t), t.set(e, a); }
function _checkPrivateRedeclaration$2(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _classPrivateFieldGet$2(s, a) { return s.get(_assertClassBrand$2(s, a)); }
function _classPrivateFieldSet$2(s, a, r) { return s.set(_assertClassBrand$2(s, a), r), r; }
function _assertClassBrand$2(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
var _host$1 = /*#__PURE__*/new WeakMap();
var _query = /*#__PURE__*/new WeakMap();
var _list = /*#__PURE__*/new WeakMap();
var _onChange = /*#__PURE__*/new WeakMap();
var _MediaQueryController_brand = /*#__PURE__*/new WeakSet();
/**
 * Tracks a media query and requests a host update whenever it starts or stops
 * matching. The query itself is reassignable, so a host can expose it as a
 * reactive property without managing listeners.
 */
var MediaQueryController = /*#__PURE__*/function () {
  /**
   * @param {ReactiveElement} host
   * @param {String | null} query - A media query, e.g. `(max-width: 1000px)`.
   */
  function MediaQueryController(host) {
    var _this = this;
    var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    _classCallCheck$2(this, MediaQueryController);
    _classPrivateMethodInitSpec$1(this, _MediaQueryController_brand);
    _classPrivateFieldInitSpec$2(this, _host$1, void 0);
    _classPrivateFieldInitSpec$2(this, _query, null);
    _classPrivateFieldInitSpec$2(this, _list, null);
    _classPrivateFieldInitSpec$2(this, _onChange, function () {
      _classPrivateFieldGet$2(_host$1, _this).requestUpdate();
    });
    _classPrivateFieldSet$2(_host$1, this, host);
    host.addController(this);
    this.query = query;
  }
  return _createClass$2(MediaQueryController, [{
    key: "query",
    get: function get() {
      return _classPrivateFieldGet$2(_query, this);
    },
    set: function set(query) {
      var next = query || null;
      if (next === _classPrivateFieldGet$2(_query, this)) return;
      _assertClassBrand$2(_MediaQueryController_brand, this, _stopListening).call(this);
      _classPrivateFieldSet$2(_query, this, next);
      _classPrivateFieldSet$2(_list, this, next ? matchMedia(next) : null);
      _assertClassBrand$2(_MediaQueryController_brand, this, _startListening).call(this);
      _classPrivateFieldGet$2(_host$1, this).requestUpdate();
    }
  }, {
    key: "matches",
    get: function get() {
      var _classPrivateFieldGet2, _classPrivateFieldGet3;
      return (_classPrivateFieldGet2 = (_classPrivateFieldGet3 = _classPrivateFieldGet$2(_list, this)) === null || _classPrivateFieldGet3 === void 0 ? void 0 : _classPrivateFieldGet3.matches) !== null && _classPrivateFieldGet2 !== void 0 ? _classPrivateFieldGet2 : false;
    }
  }, {
    key: "hostConnected",
    value: function hostConnected() {
      _assertClassBrand$2(_MediaQueryController_brand, this, _startListening).call(this);
    }
  }, {
    key: "hostDisconnected",
    value: function hostDisconnected() {
      _assertClassBrand$2(_MediaQueryController_brand, this, _stopListening).call(this);
    }
  }]);
}();
function _startListening() {
  if (!_classPrivateFieldGet$2(_list, this) || !_classPrivateFieldGet$2(_host$1, this).isConnected) return;
  _classPrivateFieldGet$2(_list, this).addEventListener("change", _classPrivateFieldGet$2(_onChange, this));
}
function _stopListening() {
  var _classPrivateFieldGet4;
  (_classPrivateFieldGet4 = _classPrivateFieldGet$2(_list, this)) === null || _classPrivateFieldGet4 === void 0 || _classPrivateFieldGet4.removeEventListener("change", _classPrivateFieldGet$2(_onChange, this));
}

function _typeof$1(o) { "@babel/helpers - typeof"; return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$1(o); }
function _classCallCheck$1(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties$1(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey$1(o.key), o); } }
function _createClass$1(e, r, t) { return r && _defineProperties$1(e.prototype, r), Object.defineProperty(e, "prototype", { writable: false }), e; }
function _toPropertyKey$1(t) { var i = _toPrimitive$1(t, "string"); return "symbol" == _typeof$1(i) ? i : i + ""; }
function _toPrimitive$1(t, r) { if ("object" != _typeof$1(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r); if ("object" != _typeof$1(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return (String )(t); }
function _classPrivateFieldInitSpec$1(e, t, a) { _checkPrivateRedeclaration$1(e, t), t.set(e, a); }
function _checkPrivateRedeclaration$1(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _classPrivateFieldGet$1(s, a) { return s.get(_assertClassBrand$1(s, a)); }
function _classPrivateFieldSet$1(s, a, r) { return s.set(_assertClassBrand$1(s, a), r), r; }
function _assertClassBrand$1(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
var _host = /*#__PURE__*/new WeakMap();
var _onResolve = /*#__PURE__*/new WeakMap();
var _onHashChange = /*#__PURE__*/new WeakMap();
/**
 * Resolves the document's fragment identifier to an element and hands it to the
 * host, on connect, on `hashchange`, and on demand.
 *
 * The host decides what a match means. This controller only answers the
 * question "what element is the URL pointing at right now?"
 */
var DeepLinkController = /*#__PURE__*/function () {
  /**
   * @param {ReactiveElement} host
   * @param {(target: Element) => void} onResolve - Called with the matched
   *   element. Not called at all when the URL has no fragment, or when the
   *   fragment matches nothing in the document.
   */
  function DeepLinkController(host, onResolve) {
    var _this = this;
    _classCallCheck$1(this, DeepLinkController);
    _classPrivateFieldInitSpec$1(this, _host, void 0);
    _classPrivateFieldInitSpec$1(this, _onResolve, void 0);
    _classPrivateFieldInitSpec$1(this, _onHashChange, function () {
      _this.resolve();
    });
    _classPrivateFieldSet$1(_host, this, host);
    _classPrivateFieldSet$1(_onResolve, this, onResolve);
    host.addController(this);
  }

  /**
   * The element the current URL points at, if any.
   */
  return _createClass$1(DeepLinkController, [{
    key: "target",
    get: function get() {
      var fragment = location.hash.slice(1);
      if (!fragment) return null;
      try {
        return document.getElementById(decodeURIComponent(fragment));
      } catch (_unused) {
        // Malformed percent-encoding throws. Fall back to the raw fragment,
        // which is what an author who wrote a literal `%` in an id would expect.
        return document.getElementById(fragment);
      }
    }
  }, {
    key: "resolve",
    value: function resolve() {
      var target = this.target;
      if (target) _classPrivateFieldGet$1(_onResolve, this).call(this, target);
    }
  }, {
    key: "hostConnected",
    value: function hostConnected() {
      window.addEventListener("hashchange", _classPrivateFieldGet$1(_onHashChange, this));
    }
  }, {
    key: "hostDisconnected",
    value: function hostDisconnected() {
      window.removeEventListener("hashchange", _classPrivateFieldGet$1(_onHashChange, this));
    }
  }]);
}();

var _templateObject$1;
function _taggedTemplateLiteral$1(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var groupStyles = i(_templateObject$1 || (_templateObject$1 = _taggedTemplateLiteral$1(["\n  :host(:not([hidden])) {\n    display: block;\n  }\n\n  [part=items] {\n    display: block;\n  }\n"])));

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _DisclosureGroup, _templateObject;
var _init_media, _init_extra_media, _init_label, _init_extra_label, _init_revision, _get_revision, _set_revision, _init_extra_revision, _init_assigned, _get_assigned, _init_extra_assigned;
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = true, o = false; try { if (i = (t = t.call(r)).next, 0 === l) ; else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = true, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: true } : { done: false, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = true, u = false; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = true, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), Object.defineProperty(e, "prototype", { writable: false }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _superPropGet(t, o, e, r) { var p = _get(_getPrototypeOf(t.prototype ), o, e); return "function" == typeof p ? function (t) { return p.apply(e, t); } : p; }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));); return t; }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: true, configurable: true } }), Object.defineProperty(t, "prototype", { writable: false }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _classPrivateMethodInitSpec(e, a) { _checkPrivateRedeclaration(e, a), a.add(e); }
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e; }
function _classPrivateSetter(s, r, a, t) { return r(_assertClassBrand(s, a), t), t; }
function _classPrivateGetter(s, r, a) { return a(_assertClassBrand(s, r)); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
function _applyDecs(e, t, n, r, o, i) { var a, c, u, s, f, l, p, d = Symbol.metadata || Symbol["for"]("Symbol.metadata"), m = Object.defineProperty, h = Object.create, y = [h(null), h(null)], v = t.length; function g(t, n, r) { return function (o, i) { n && (i = o, o = e); for (var a = 0; a < t.length; a++) i = t[a].apply(o, r ? [i] : []); return r ? i : o; }; } function b(e, t, n, r) { if ("function" != typeof e && (r || void 0 !== e)) throw new TypeError(t + " must " + (n || "be") + " a function" + (r ? "" : " or undefined")); return e; } function applyDec(e, t, n, r, o, i, u, s, f, l, p) { function d(e) { if (!p(e)) throw new TypeError("Attempted to access private element on non-instance"); } var h = [].concat(t[0]), v = t[3], w = !u, D = 1 === o, S = 3 === o, j = 4 === o, E = 2 === o; function I(t, n, r) { return function (o, i) { return n && (i = o, o = e), r && r(o), P[t].call(o, i); }; } if (!w) { var P = {}, k = [], F = S ? "get" : j || D ? "set" : "value"; if (f ? (l || D ? P = { get: _setFunctionName(function () { return v(this); }, r, "get"), set: function set(e) { t[4](this, e); } } : P[F] = v, l || _setFunctionName(P[F], r, E ? "" : F)) : l || (P = Object.getOwnPropertyDescriptor(e, r)), !l && !f) { if ((c = y[+s][r]) && 7 !== (c ^ o)) throw Error("Decorating two elements with the same name (" + P[F].name + ") is not supported yet"); y[+s][r] = o < 3 ? 1 : o; } } for (var N = e, O = h.length - 1; O >= 0; O -= n ? 2 : 1) { var T = b(h[O], "A decorator", "be", true), z = n ? h[O - 1] : void 0, A = {}, H = { kind: ["field", "accessor", "method", "getter", "setter", "class"][o], name: r, metadata: a, addInitializer: function (e, t) { if (e.v) throw new TypeError("attempted to call addInitializer after decoration was finished"); b(t, "An initializer", "be", true), i.push(t); }.bind(null, A) }; if (w) c = T.call(z, N, H), A.v = 1, b(c, "class decorators", "return") && (N = c);else if (H["static"] = s, H["private"] = f, c = H.access = { has: f ? p.bind() : function (e) { return r in e; } }, j || (c.get = f ? E ? function (e) { return d(e), P.value; } : I("get", 0, d) : function (e) { return e[r]; }), E || S || (c.set = f ? I("set", 0, d) : function (e, t) { e[r] = t; }), N = T.call(z, D ? { get: P.get, set: P.set } : P[F], H), A.v = 1, D) { if ("object" == _typeof(N) && N) (c = b(N.get, "accessor.get")) && (P.get = c), (c = b(N.set, "accessor.set")) && (P.set = c), (c = b(N.init, "accessor.init")) && k.unshift(c);else if (void 0 !== N) throw new TypeError("accessor decorators must return an object with get, set, or init properties or undefined"); } else b(N, (l ? "field" : "method") + " decorators", "return") && (l ? k.unshift(N) : P[F] = N); } return o < 2 && u.push(g(k, s, 1), g(i, s, 0)), l || w || (f ? D ? u.splice(-1, 0, I("get", s), I("set", s)) : u.push(E ? P[F] : b.call.bind(P[F])) : m(e, r, P)), N; } function w(e) { return m(e, d, { configurable: true, enumerable: true, value: a }); } return void 0 !== i && (a = i[d]), a = h(null == a ? null : a), f = [], l = function l(e) { e && f.push(g(e)); }, p = function p(t, r) { for (var i = 0; i < n.length; i++) { var a = n[i], c = a[1], l = 7 & c; if ((8 & c) == t && !l == r) { var p = a[2], d = !!a[3], m = 16 & c; applyDec(t ? e : e.prototype, a, m, d ? "#" + p : _toPropertyKey(p), l, l < 2 ? [] : t ? s = s || [] : u = u || [], f, !!t, d, r, t && d ? function (t) { return _checkInRHS(t) === e; } : o); } } }, p(8, 0), p(0, 0), p(8, 1), p(0, 1), l(u), l(s), c = f, v || w(e), { e: c, get c() { var n = []; return v && [w(e = applyDec(e, [t], r, e.name, 5, n)), g(n, 1)]; } }; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _setFunctionName(e, t, n) { "symbol" == _typeof(t) && (t = (t = t.description) ? "[" + t + "]" : ""); try { Object.defineProperty(e, "name", { configurable: !0, value: n ? n + " " + t : t }); } catch (e) {} return e; }
function _checkInRHS(e) { if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (null !== e ? _typeof(e) : "null")); return e; }
var _A = /*#__PURE__*/new WeakMap();
var _B = /*#__PURE__*/new WeakMap();
var _C = /*#__PURE__*/new WeakMap();
var _DisclosureGroup_brand = /*#__PURE__*/new WeakSet();
var _D = /*#__PURE__*/new WeakMap();
var _mediaQuery = /*#__PURE__*/new WeakMap();
var _deepLink = /*#__PURE__*/new WeakMap();
var _preferred = /*#__PURE__*/new WeakMap();
var _signature = /*#__PURE__*/new WeakMap();
var _onItemChange = /*#__PURE__*/new WeakMap();
var _onItemTitleChange = /*#__PURE__*/new WeakMap();
var _onDeepLink = /*#__PURE__*/new WeakMap();
var DisclosureGroup = /*#__PURE__*/function (_LitElement) {
  // #endregion

  // #region Lifecycle
  function DisclosureGroup() {
    var _this;
    _classCallCheck(this, DisclosureGroup);
    _this = _callSuper(this, DisclosureGroup);
    _classPrivateMethodInitSpec(_this, _DisclosureGroup_brand);
    // #region Properties and state
    /**
     * A media query, e.g. `(max-width: 1000px)`. While it matches, the group
     * presents its default pattern, otherwise it presents the alternate.
     */
    _classPrivateFieldInitSpec(_this, _A, _init_media(_this));
    /**
     * Accessible name for the group's own controls. Optional; omitted rather
     * than defaulted, since a generic name is worse than none.
     */
    _classPrivateFieldInitSpec(_this, _B, (_init_extra_media(_this), _init_label(_this)));
    /**
     * Bumped whenever the assigned children change. `items` reads live DOM, so
     * something reactive has to stand in for it.
     */
    _classPrivateFieldInitSpec(_this, _C, (_init_extra_label(_this), _init_revision(_this, 0)));
    // #endregion
    // #region Private variables
    _classPrivateFieldInitSpec(_this, _D, (_init_extra_revision(_this), _init_assigned(_this)));
    _classPrivateFieldInitSpec(_this, _mediaQuery, void _init_extra_assigned(_this));
    _classPrivateFieldInitSpec(_this, _deepLink, void 0);
    /**
     * The item whose state changed most recently. When an exclusive group finds
     * more than one item expanded, this is the one that wins.
     */
    _classPrivateFieldInitSpec(_this, _preferred, null);
    _classPrivateFieldInitSpec(_this, _signature, null);
    _classPrivateFieldInitSpec(_this, _onItemChange, function (event) {
      var item = event.target;
      if (!_this.items.includes(item)) return;
      _assertClassBrand(_DisclosureGroup_brand, _this, _setExpanded).call(_this, item, event.detail.expanded);
    });
    _classPrivateFieldInitSpec(_this, _onItemTitleChange, function (event) {
      if (!_this.items.includes(event.target)) return;
      _this.requestUpdate();
    });
    _classPrivateFieldInitSpec(_this, _onDeepLink, function (target) {
      var item = _this.items.find(function (item) {
        return item === target || item.contains(target);
      });
      if (!item) return;
      _this.expand(item);

      // The browser already tried to scroll here and found nothing laid out,
      // because the panel was hidden at the time.
      _this.updateComplete.then(function () {
        target.scrollIntoView({
          block: "start",
          behavior: "instant"
        });
      });
    });
    _classPrivateFieldSet(_mediaQuery, _this, new MediaQueryController(_this));
    _classPrivateFieldSet(_deepLink, _this, new DeepLinkController(_this, _classPrivateFieldGet(_onDeepLink, _this)));
    _this.addEventListener("tcds-disclosure-change", _classPrivateFieldGet(_onItemChange, _this));
    _this.addEventListener("tcds-disclosure-title-change", _classPrivateFieldGet(_onItemTitleChange, _this));
    return _this;
  }
  _inherits(DisclosureGroup, _LitElement);
  return _createClass(DisclosureGroup, [{
    key: "media",
    get: function get() {
      return _classPrivateFieldGet(_A, this);
    },
    set: function set(v) {
      _classPrivateFieldSet(_A, this, v);
    }
  }, {
    key: "label",
    get: function get() {
      return _classPrivateFieldGet(_B, this);
    },
    set: function set(v) {
      _classPrivateFieldSet(_B, this, v);
    }
  }, {
    key: "willUpdate",
    value: function willUpdate(changedProperties) {
      var _this$media;
      _superPropGet(DisclosureGroup, "willUpdate", this)([]);
      _classPrivateFieldGet(_mediaQuery, this).query = (_this$media = this.media) !== null && _this$media !== void 0 ? _this$media : null;

      // Items live in the light DOM behind a slot, so there is nothing to read
      // until the first render has put that slot in place.
      if (!this.hasUpdated) return;
      _assertClassBrand(_DisclosureGroup_brand, this, _syncItems).call(this);
    }
  }, {
    key: "render",
    value: function render() {
      return u(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n      ", "\n      <div part=\"items\">\n        <slot @slotchange=", "></slot>\n      </div>\n    "])), this.renderHeader(), _assertClassBrand(_DisclosureGroup_brand, this, _onSlotChange));
    }
  }, {
    key: "updated",
    value: function updated() {
      _assertClassBrand(_DisclosureGroup_brand, this, _announceChange).call(this);
    }
    // #endregion

    // #region Subclass contract
    /**
     * The pattern presented when `media` is absent or not matching.
     */
  }, {
    key: "defaultMode",
    get: function get() {
      return "accordion";
    }

    /**
     * The pattern presented while `media` matches.
     */
  }, {
    key: "mediaMode",
    get: function get() {
      return "plain";
    }

    /**
     * Whether more than one item may be expanded at once.
     */
  }, {
    key: "allowsMultiple",
    get: function get() {
      return false;
    }

    /**
     * Whether exactly one item must always be expanded. True for tabs, where
     * there is no such thing as no tab being selected.
     */
  }, {
    key: "requiresSelection",
    get: function get() {
      return false;
    }

    /**
     * Chrome rendered above the items — a tablist, expand/collapse buttons.
     */
  }, {
    key: "renderHeader",
    value: function renderHeader() {
      return A;
    }
    // #endregion

    // #region Public API
  }, {
    key: "mode",
    get: function get() {
      if (!_classPrivateFieldGet(_mediaQuery, this).query) return this.defaultMode;
      return _classPrivateFieldGet(_mediaQuery, this).matches ? this.defaultMode : this.mediaMode;
    }

    /**
     * Direct children that are disclosures. Filtering on the base class rather
     * than a tag name means a group never adopts a stray element, and the
     * subclass modules import their item modules, so upgrades have always
     * happened by the time this is read.
     */
  }, {
    key: "items",
    get: function get() {
      var _classPrivateGetter$f, _classPrivateGetter2;
      return (_classPrivateGetter$f = (_classPrivateGetter2 = _classPrivateGetter(_DisclosureGroup_brand, this, _get_assigned)) === null || _classPrivateGetter2 === void 0 ? void 0 : _classPrivateGetter2.filter(function (element) {
        return element instanceof Disclosure;
      })) !== null && _classPrivateGetter$f !== void 0 ? _classPrivateGetter$f : [];
    }
  }, {
    key: "expandedItems",
    get: function get() {
      return this.items.filter(function (item) {
        return item.expanded;
      });
    }
  }, {
    key: "expand",
    value: function expand(item) {
      _assertClassBrand(_DisclosureGroup_brand, this, _setExpanded).call(this, item, true);
    }
  }, {
    key: "collapse",
    value: function collapse(item) {
      _assertClassBrand(_DisclosureGroup_brand, this, _setExpanded).call(this, item, false);
    }
  }, {
    key: "toggle",
    value: function toggle(item) {
      _assertClassBrand(_DisclosureGroup_brand, this, _setExpanded).call(this, item, !(item !== null && item !== void 0 && item.expanded));
    }
  }, {
    key: "expandAll",
    value: function expandAll() {
      if (!this.allowsMultiple) return;
      var _iterator = _createForOfIteratorHelper(this.items),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var item = _step.value;
          item.expanded = true;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      this.requestUpdate();
    }
  }, {
    key: "collapseAll",
    value: function collapseAll() {
      var _iterator2 = _createForOfIteratorHelper(this.items),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var item = _step2.value;
          item.expanded = false;
        }

        // `requiresSelection` groups get one item re-expanded on the way through.
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      _classPrivateFieldSet(_preferred, this, null);
      this.requestUpdate();
    }
    // #endregion

    // #region Events

    // #endregion
  }]);
}(i$1);
_DisclosureGroup = DisclosureGroup;
function _onSlotChange() {
  var _this$revision;
  _classPrivateSetter(_DisclosureGroup_brand, _set_revision, this, (_this$revision = _classPrivateGetter(_DisclosureGroup_brand, this, _get_revision), _this$revision++, _this$revision));

  // First moment the items are knowable, and therefore the first moment a
  // fragment in the URL can be acted on.
  _classPrivateFieldGet(_deepLink, this).resolve();
}
// #endregion
// #region Utility methods
function _setExpanded(item, expanded) {
  if (!this.items.includes(item)) return;
  if (!expanded && this.requiresSelection && this.expandedItems.length <= 1) return;
  if (expanded && !this.allowsMultiple) {
    var _iterator3 = _createForOfIteratorHelper(this.expandedItems),
      _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var other = _step3.value;
        if (other !== item) other.expanded = false;
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
  }
  _classPrivateFieldSet(_preferred, this, expanded ? item : null);
  item.expanded = expanded;
  this.requestUpdate();
}
function _syncItems() {
  var _this2 = this;
  var items = this.items;
  items.forEach(function (item, position) {
    item.mode = _this2.mode;
    item.position = position;
    item.total = items.length;
  });
  _assertClassBrand(_DisclosureGroup_brand, this, _enforce).call(this, items);
}
/**
 * Runs in `willUpdate`, so the group's own chrome renders against settled
 * state rather than trailing it by a frame.
 */
function _enforce(items) {
  if (items.length === 0) return;
  var expanded = items.filter(function (item) {
    return item.expanded;
  });
  if (!this.allowsMultiple && expanded.length > 1) {
    var keep = expanded.includes(_classPrivateFieldGet(_preferred, this)) ? _classPrivateFieldGet(_preferred, this) : expanded[0];
    var _iterator4 = _createForOfIteratorHelper(expanded),
      _step4;
    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var item = _step4.value;
        if (item !== keep) item.expanded = false;
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }
    expanded = [keep];
  }
  if (this.requiresSelection && expanded.length === 0) {
    items[0].expanded = true;
  }
}
/**
 * Emits only when the expanded set genuinely changed. A signature of a
 * different length means items were added or removed, which is a change to
 * the group's contents rather than to its state.
 */
function _announceChange() {
  var items = this.items;
  var signature = items.map(function (item) {
    return item.expanded ? "1" : "0";
  }).join("");
  var previous = _classPrivateFieldGet(_signature, this);
  _classPrivateFieldSet(_signature, this, signature);
  if (previous === null || previous.length !== signature.length) return;
  if (previous === signature) return;
  this.dispatchEvent(new CustomEvent("".concat(this.localName, "-change"), {
    detail: {
      expandedItems: items.filter(function (item) {
        return item.expanded;
      }),
      mode: this.mode
    },
    bubbles: true,
    composed: true
  }));
}
var _applyDecs$e = _slicedToArray(_applyDecs(_DisclosureGroup, [], [[n({
  type: String
}), 1, "media"], [n({
  type: String
}), 1, "label"], [r(), 1, "revision", function (o) {
  return _classPrivateFieldGet(_C, o);
}, function (o, v) {
  return _classPrivateFieldSet(_C, o, v);
}], [o({
  flatten: true
}), 1, "assigned", function (o) {
  return _classPrivateFieldGet(_D, o);
}, function (o, v) {
  return _classPrivateFieldSet(_D, o, v);
}]], 0, function (_) {
  return _onDeepLink.has(_checkInRHS(_));
}, i$1).e, 12);
_init_media = _applyDecs$e[0];
_init_extra_media = _applyDecs$e[1];
_init_label = _applyDecs$e[2];
_init_extra_label = _applyDecs$e[3];
_init_revision = _applyDecs$e[4];
_get_revision = _applyDecs$e[5];
_set_revision = _applyDecs$e[6];
_init_extra_revision = _applyDecs$e[7];
_init_assigned = _applyDecs$e[8];
_get_assigned = _applyDecs$e[9];
_applyDecs$e[10];
_init_extra_assigned = _applyDecs$e[11];
_defineProperty(DisclosureGroup, "styles", [styles, groupStyles]);

export { DisclosureGroup as D, SizeBreakpointMd as S, Disclosure as a, styles as s };
