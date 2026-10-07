import { i, a as i$1, n, u, A, r, o } from './vendor.js';

const styles = i`body{background-color:var(--tcds-color-theme-background);color:var(--tcds-color-theme-text-primary);font-family:var(--tcds-font-family-body);font-size:var(--tcds-font-size-md);font-variant-numeric:lining-nums;font-variant-ligatures:none;margin:0;padding:0;overflow-wrap:break-word;overflow-x:hidden}@media(prefers-contrast: no-preference),(prefers-contrast: less){body{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}}button,input{touch-action:manipulation;-webkit-tap-highlight-color:rgba(0,0,0,0)}button[type=submit],input[type=submit]{--tcds-button-background-color: var(--tcds-color-theme-accent);--tcds-button-background-color-hover: color-mix(in oklab, var(--tcds-color-theme-accent), rgb(0 0 0) 10%);--tcds-button-border-color: var(--tcds-button-background-color);--tcds-button-border-color-hover: var(--tcds-button-background-color-hover);--tcds-button-text-color: var(--tcds-color-theme-accent-text-primary);--tcds-button-text-color-hover: var(--tcds-color-theme-accent-text-primary);--tcds-button-padding: 0 1.25rem;--tcds-button-font-size: var(--tcds-font-size-md)}@media(width >= 960px){button[type=submit],input[type=submit]{--tcds-button-padding: 0 2rem}}button[type=submit],input[type=submit]{--tcds-button-height: var(--tcds-size-component-lg);--tcds-button-width: auto;background-color:var(--tcds-button-background-color);border:var(--tcds-button-border-width, 2px) solid var(--tcds-button-border-color, var(--tcds-button-background-color));color:var(--tcds-button-text-color);cursor:pointer;font-family:var(--tcds-font-family-ui);font-weight:var(--tcds-font-weight-ui);font-size:var(--tcds-button-font-size);padding:var(--tcds-button-padding);height:var(--tcds-button-height);width:var(--tcds-button-width);border-radius:var(--tcds-button-height);display:inline-flex;gap:.75rem;align-items:center;justify-content:center;text-align:center;text-decoration:none;line-height:1;transition-property:background-color,border-color,color;transition-duration:var(--tcds-motion-duration-productive);transition-timing-function:var(--tcds-motion-easing-translate)}button[type=submit]:hover,button[type=submit]:active,input[type=submit]:hover,input[type=submit]:active{background-color:var(--tcds-button-background-color-hover);color:var(--tcds-button-text-color-hover);border-color:var(--tcds-button-border-color-hover)}button[type=submit]:active,input[type=submit]:active{background-color:var(--tcds-button-background-color-active, var(--tcds-button-background-color-hover));color:var(--tcds-button-text-color-active, var(--tcds-button-text-color-hover));border-color:var(--tcds-button-border-color-active, var(--tcds-button-border-color-hover))}button[type=submit] tcds-icon,button[type=submit]:is(tcds-icon),input[type=submit] tcds-icon,input[type=submit]:is(tcds-icon){font-size:var(--tcds-button-icon-size, 0.8em);color:var(--tcds-button-icon-color, inherit)}button[type=submit]:is(tcds-icon),input[type=submit]:is(tcds-icon){--tcds-button-padding: 0 ;--tcds-button-width: var(--tcds-button-height) }button[type=submit],input[type=submit]{--tcds-button-height: 50px}[data-theme]{color:var(--tcds-color-theme-text-primary)}:not([slot])+p{margin-block-start:1.5rem}p:not(:last-child){margin-block-end:1.5rem}:where(ul,ol){margin-top:0;margin-left:4ch;padding:0}:where(ul ul,ul ol,ol ul,ol ol){margin-left:2ch}:where(:not(li)>:is(ul,ol):not(:last-child)){margin-bottom:1rem}ul:where([role=list]),ol:where([role=list]){list-style:none;margin:0}:where(ol ol){list-style:upper-alpha}:where(ol ol ol){list-style:upper-roman}ol ::marker{font-family:var(--tcds-font-family-ui);font-weight:var(--tcds-font-weight-ui);color:rgba(0,0,0,.5);font-variant-numeric:lining-nums tabular-nums}:where(p,ol,ul,dl){line-height:var(--tcds-line-height-comfortable);color:inherit}:where(small,sub,sup){font-size:max(var(--tcds-font-size-xs),85%)}:where(sup){vertical-align:baseline;position:relative;top:-0.333lh}:where(a){color:var(--tcds-link-color);text-decoration:underline;touch-action:manipulation;-webkit-tap-highlight-color:rgba(0,0,0,0)}:where(a:hover){color:var(--tcds-link-color-hover);text-decoration:none}:where(h1),:is(tcds-accordion,tcds-tabs) :where(h2){font:3rem/1.06 Fraunces,serif}@media(width >= 960px){:where(h1),:is(tcds-accordion,tcds-tabs) :where(h2){font:4.5rem/1.06 Fraunces,serif}}:where(h2),:is(tcds-accordion,tcds-tabs) :where(h3){font:2.625rem/1.06 Fraunces,serif}@media(width >= 960px){:where(h2),:is(tcds-accordion,tcds-tabs) :where(h3){font:3.75rem/1.06 Fraunces,serif}}:where(h3),:is(tcds-accordion,tcds-tabs) :where(h4){font:2.125rem/1.33 Fraunces,serif}@media(width >= 960px){:where(h3),:is(tcds-accordion,tcds-tabs) :where(h4){font:3rem/1.06 Fraunces,serif}}:where(h4),:is(tcds-accordion,tcds-tabs) :where(h5){font:1.25rem/1.33 Fraunces,serif}@media(width >= 960px){:where(h4),:is(tcds-accordion,tcds-tabs) :where(h5){font:2.625rem/1.33 Fraunces,serif}}:where(h1:not(:last-child)){margin-bottom:1em}:is(h2,h3,h4,h5,h6):where(:not(:first-child,[slot])){margin-top:2rem}:is(h2,h3,h4,h5,h6):where(:not(:last-child,[slot])){margin-bottom:2rem}:where(:not(h1,hr)+h2:not([slot])),:where(:not(h2,hr)+h3:not([slot])),:where(:not(h3,hr)+h4:not([slot])),:where(:not(h4,hr)+h5:not([slot])){margin-top:4rem}hr{border:none;border-top:1px solid var(--tcds-color-theme-edge);margin:1.5em 0}:where(audio,canvas,iframe,img,picture,svg,video){display:block;vertical-align:middle;max-width:100%}:where(:where(audio,canvas,iframe,img,picture,svg,video):not([height])){height:auto}:where(img,picture,svg,video){border:var(--tcds-media-border, 0);border-radius:var(--tcds-media-border-radius, 0);overflow:hidden}*{box-sizing:border-box;margin:0;padding:0}*::before,*::after{box-sizing:border-box}:root{text-size-adjust:100%}@media(prefers-reduced-motion: no-preference){:root{scroll-behavior:smooth;interpolate-size:allow-keywords}}.text-accent{color:var(--tcds-color-theme-accent) !important}.tcds-icon,tcds-icon{display:inline-flex;vertical-align:middle;align-items:center}.tcds-icon::after,tcds-icon::after{content:"" !important;display:inline-block !important;height:1em !important;width:1em !important}.tcds-icon[category=duotone]::after,tcds-icon[category=duotone]::after{background-image:var(--tcds-icon) !important}.tcds-icon:not([category=duotone])::after,tcds-icon:not([category=duotone])::after{background:currentcolor !important;mask:var(--tcds-icon) no-repeat center !important}.bg-icon{position:relative;overflow:hidden;z-index:1}.bg-icon::before{content:"";display:block;position:absolute;top:0;left:0;width:100%;height:100%;background-color:var(--tcds-color-theme-faded);mask-image:var(--tcds-icon);mask-position:-15% center;mask-repeat:no-repeat;mask-size:200%;z-index:-1}@media(width >= 1312px){.bg-icon::before{mask-position:200% center;mask-size:85%}}.tcds-icon--facebook,.tcds-icon--facebook--brand,.bg-icon--facebook,.bg-icon--facebook--brand,tcds-icon[icon~=facebook],tcds-icon[icon~=facebook][category~=brand]{--tcds-icon: var(--tcds-icon-brand-facebook)}.tcds-icon--instagram,.tcds-icon--instagram--brand,.bg-icon--instagram,.bg-icon--instagram--brand,tcds-icon[icon~=instagram],tcds-icon[icon~=instagram][category~=brand]{--tcds-icon: var(--tcds-icon-brand-instagram)}.tcds-icon--mychart,.tcds-icon--mychart--brand,.bg-icon--mychart,.bg-icon--mychart--brand,tcds-icon[icon~=mychart],tcds-icon[icon~=mychart][category~=brand]{--tcds-icon: var(--tcds-icon-brand-mychart)}.tcds-icon--texans,.tcds-icon--texans--brand,.bg-icon--texans,.bg-icon--texans--brand,tcds-icon[icon~=texans],tcds-icon[icon~=texans][category~=brand]{--tcds-icon: var(--tcds-icon-brand-texans)}.tcds-icon--texas-childrens,.tcds-icon--texas-childrens--brand,.bg-icon--texas-childrens,.bg-icon--texas-childrens--brand,tcds-icon[icon~=texas-childrens],tcds-icon[icon~=texas-childrens][category~=brand]{--tcds-icon: var(--tcds-icon-brand-texas-childrens)}.tcds-icon--twitter,.tcds-icon--twitter--brand,.bg-icon--twitter,.bg-icon--twitter--brand,tcds-icon[icon~=twitter],tcds-icon[icon~=twitter][category~=brand]{--tcds-icon: var(--tcds-icon-brand-twitter)}.tcds-icon--youtube,.tcds-icon--youtube--brand,.bg-icon--youtube,.bg-icon--youtube--brand,tcds-icon[icon~=youtube],tcds-icon[icon~=youtube][category~=brand]{--tcds-icon: var(--tcds-icon-brand-youtube)}.tcds-icon--baby-face,.tcds-icon--baby-face--duotone,.bg-icon--baby-face,.bg-icon--baby-face--duotone,tcds-icon[icon~=baby-face],tcds-icon[icon~=baby-face][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-baby-face)}.tcds-icon--baby-held,.tcds-icon--baby-held--duotone,.bg-icon--baby-held,.bg-icon--baby-held--duotone,tcds-icon[icon~=baby-held],tcds-icon[icon~=baby-held][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-baby-held)}.tcds-icon--baby-stork,.tcds-icon--baby-stork--duotone,.bg-icon--baby-stork,.bg-icon--baby-stork--duotone,tcds-icon[icon~=baby-stork],tcds-icon[icon~=baby-stork][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-baby-stork)}.tcds-icon--badge-heart,.tcds-icon--badge-heart--duotone,.bg-icon--badge-heart,.bg-icon--badge-heart--duotone,tcds-icon[icon~=badge-heart],tcds-icon[icon~=badge-heart][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-badge-heart)}.tcds-icon--browser-medical,.tcds-icon--browser-medical--duotone,.bg-icon--browser-medical,.bg-icon--browser-medical--duotone,tcds-icon[icon~=browser-medical],tcds-icon[icon~=browser-medical][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-browser-medical)}.tcds-icon--caduceus,.tcds-icon--caduceus--duotone,.bg-icon--caduceus,.bg-icon--caduceus--duotone,tcds-icon[icon~=caduceus],tcds-icon[icon~=caduceus][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-caduceus)}.tcds-icon--calendar-edit,.tcds-icon--calendar-edit--duotone,.bg-icon--calendar-edit,.bg-icon--calendar-edit--duotone,tcds-icon[icon~=calendar-edit],tcds-icon[icon~=calendar-edit][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-calendar-edit)}.tcds-icon--calendar-star,.tcds-icon--calendar-star--duotone,.bg-icon--calendar-star,.bg-icon--calendar-star--duotone,tcds-icon[icon~=calendar-star],tcds-icon[icon~=calendar-star][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-calendar-star)}.tcds-icon--card-medical,.tcds-icon--card-medical--duotone,.bg-icon--card-medical,.bg-icon--card-medical--duotone,tcds-icon[icon~=card-medical],tcds-icon[icon~=card-medical][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-card-medical)}.tcds-icon--clipboard-check,.tcds-icon--clipboard-check--duotone,.bg-icon--clipboard-check,.bg-icon--clipboard-check--duotone,tcds-icon[icon~=clipboard-check],tcds-icon[icon~=clipboard-check][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-clipboard-check)}.tcds-icon--clipboard-heart,.tcds-icon--clipboard-heart--duotone,.bg-icon--clipboard-heart,.bg-icon--clipboard-heart--duotone,tcds-icon[icon~=clipboard-heart],tcds-icon[icon~=clipboard-heart][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-clipboard-heart)}.tcds-icon--clipboard-search,.tcds-icon--clipboard-search--duotone,.bg-icon--clipboard-search,.bg-icon--clipboard-search--duotone,tcds-icon[icon~=clipboard-search],tcds-icon[icon~=clipboard-search][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-clipboard-search)}.tcds-icon--family-plus,.tcds-icon--family-plus--duotone,.bg-icon--family-plus,.bg-icon--family-plus--duotone,tcds-icon[icon~=family-plus],tcds-icon[icon~=family-plus][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-family-plus)}.tcds-icon--flask-conical,.tcds-icon--flask-conical--duotone,.bg-icon--flask-conical,.bg-icon--flask-conical--duotone,tcds-icon[icon~=flask-conical],tcds-icon[icon~=flask-conical][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-flask-conical)}.tcds-icon--flask-test-tube,.tcds-icon--flask-test-tube--duotone,.bg-icon--flask-test-tube,.bg-icon--flask-test-tube--duotone,tcds-icon[icon~=flask-test-tube],tcds-icon[icon~=flask-test-tube][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-flask-test-tube)}.tcds-icon--food-apple,.tcds-icon--food-apple--duotone,.bg-icon--food-apple,.bg-icon--food-apple--duotone,tcds-icon[icon~=food-apple],tcds-icon[icon~=food-apple][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-food-apple)}.tcds-icon--food-beet,.tcds-icon--food-beet--duotone,.bg-icon--food-beet,.bg-icon--food-beet--duotone,tcds-icon[icon~=food-beet],tcds-icon[icon~=food-beet][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-food-beet)}.tcds-icon--globe-flask,.tcds-icon--globe-flask--duotone,.bg-icon--globe-flask,.bg-icon--globe-flask--duotone,tcds-icon[icon~=globe-flask],tcds-icon[icon~=globe-flask][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-globe-flask)}.tcds-icon--globe-star,.tcds-icon--globe-star--duotone,.bg-icon--globe-star,.bg-icon--globe-star--duotone,tcds-icon[icon~=globe-star],tcds-icon[icon~=globe-star][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-globe-star)}.tcds-icon--globe,.tcds-icon--globe--duotone,.bg-icon--globe,.bg-icon--globe--duotone,tcds-icon[icon~=globe],tcds-icon[icon~=globe][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-globe)}.tcds-icon--grid-four,.tcds-icon--grid-four--duotone,.bg-icon--grid-four,.bg-icon--grid-four--duotone,tcds-icon[icon~=grid-four],tcds-icon[icon~=grid-four][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-grid-four)}.tcds-icon--hand-heart,.tcds-icon--hand-heart--duotone,.bg-icon--hand-heart,.bg-icon--hand-heart--duotone,tcds-icon[icon~=hand-heart],tcds-icon[icon~=hand-heart][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-hand-heart)}.tcds-icon--hands-heart-horizontal,.tcds-icon--hands-heart-horizontal--duotone,.bg-icon--hands-heart-horizontal,.bg-icon--hands-heart-horizontal--duotone,tcds-icon[icon~=hands-heart-horizontal],tcds-icon[icon~=hands-heart-horizontal][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-hands-heart-horizontal)}.tcds-icon--hands-heart-raised,.tcds-icon--hands-heart-raised--duotone,.bg-icon--hands-heart-raised,.bg-icon--hands-heart-raised--duotone,tcds-icon[icon~=hands-heart-raised],tcds-icon[icon~=hands-heart-raised][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-hands-heart-raised)}.tcds-icon--head-atom,.tcds-icon--head-atom--duotone,.bg-icon--head-atom,.bg-icon--head-atom--duotone,tcds-icon[icon~=head-atom],tcds-icon[icon~=head-atom][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-head-atom)}.tcds-icon--heart-pulse,.tcds-icon--heart-pulse--duotone,.bg-icon--heart-pulse,.bg-icon--heart-pulse--duotone,tcds-icon[icon~=heart-pulse],tcds-icon[icon~=heart-pulse][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-heart-pulse)}.tcds-icon--laptop-check,.tcds-icon--laptop-check--duotone,.bg-icon--laptop-check,.bg-icon--laptop-check--duotone,tcds-icon[icon~=laptop-check],tcds-icon[icon~=laptop-check][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-laptop-check)}.tcds-icon--laptop-heart,.tcds-icon--laptop-heart--duotone,.bg-icon--laptop-heart,.bg-icon--laptop-heart--duotone,tcds-icon[icon~=laptop-heart],tcds-icon[icon~=laptop-heart][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-laptop-heart)}.tcds-icon--laptop-medical,.tcds-icon--laptop-medical--duotone,.bg-icon--laptop-medical,.bg-icon--laptop-medical--duotone,tcds-icon[icon~=laptop-medical],tcds-icon[icon~=laptop-medical][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-laptop-medical)}.tcds-icon--location-pin-ground,.tcds-icon--location-pin-ground--duotone,.bg-icon--location-pin-ground,.bg-icon--location-pin-ground--duotone,tcds-icon[icon~=location-pin-ground],tcds-icon[icon~=location-pin-ground][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-location-pin-ground)}.tcds-icon--location-pin-medical,.tcds-icon--location-pin-medical--duotone,.bg-icon--location-pin-medical,.bg-icon--location-pin-medical--duotone,tcds-icon[icon~=location-pin-medical],tcds-icon[icon~=location-pin-medical][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-location-pin-medical)}.tcds-icon--map-search,.tcds-icon--map-search--duotone,.bg-icon--map-search,.bg-icon--map-search--duotone,tcds-icon[icon~=map-search],tcds-icon[icon~=map-search][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-map-search)}.tcds-icon--medical-kit,.tcds-icon--medical-kit--duotone,.bg-icon--medical-kit,.bg-icon--medical-kit--duotone,tcds-icon[icon~=medical-kit],tcds-icon[icon~=medical-kit][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-medical-kit)}.tcds-icon--people-chat,.tcds-icon--people-chat--duotone,.bg-icon--people-chat,.bg-icon--people-chat--duotone,tcds-icon[icon~=people-chat],tcds-icon[icon~=people-chat][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-people-chat)}.tcds-icon--person-woman,.tcds-icon--person-woman--duotone,.bg-icon--person-woman,.bg-icon--person-woman--duotone,tcds-icon[icon~=person-woman],tcds-icon[icon~=person-woman][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-person-woman)}.tcds-icon--personnel-doctor-bag-man,.tcds-icon--personnel-doctor-bag-man--duotone,.bg-icon--personnel-doctor-bag-man,.bg-icon--personnel-doctor-bag-man--duotone,tcds-icon[icon~=personnel-doctor-bag-man],tcds-icon[icon~=personnel-doctor-bag-man][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-personnel-doctor-bag-man)}.tcds-icon--personnel-doctor-man,.tcds-icon--personnel-doctor-man--duotone,.bg-icon--personnel-doctor-man,.bg-icon--personnel-doctor-man--duotone,tcds-icon[icon~=personnel-doctor-man],tcds-icon[icon~=personnel-doctor-man][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-personnel-doctor-man)}.tcds-icon--personnel-doctor-woman,.tcds-icon--personnel-doctor-woman--duotone,.bg-icon--personnel-doctor-woman,.bg-icon--personnel-doctor-woman--duotone,tcds-icon[icon~=personnel-doctor-woman],tcds-icon[icon~=personnel-doctor-woman][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-personnel-doctor-woman)}.tcds-icon--personnel-medical-bag-man,.tcds-icon--personnel-medical-bag-man--duotone,.bg-icon--personnel-medical-bag-man,.bg-icon--personnel-medical-bag-man--duotone,tcds-icon[icon~=personnel-medical-bag-man],tcds-icon[icon~=personnel-medical-bag-man][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-personnel-medical-bag-man)}.tcds-icon--personnel-nurse-cross,.tcds-icon--personnel-nurse-cross--duotone,.bg-icon--personnel-nurse-cross,.bg-icon--personnel-nurse-cross--duotone,tcds-icon[icon~=personnel-nurse-cross],tcds-icon[icon~=personnel-nurse-cross][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-personnel-nurse-cross)}.tcds-icon--search-person-man,.tcds-icon--search-person-man--duotone,.bg-icon--search-person-man,.bg-icon--search-person-man--duotone,tcds-icon[icon~=search-person-man],tcds-icon[icon~=search-person-man][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-search-person-man)}.tcds-icon--search-person-woman,.tcds-icon--search-person-woman--duotone,.bg-icon--search-person-woman,.bg-icon--search-person-woman--duotone,tcds-icon[icon~=search-person-woman],tcds-icon[icon~=search-person-woman][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-search-person-woman)}.tcds-icon--search-square,.tcds-icon--search-square--duotone,.bg-icon--search-square,.bg-icon--search-square--duotone,tcds-icon[icon~=search-square],tcds-icon[icon~=search-square][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-search-square)}.tcds-icon--search,.tcds-icon--search--duotone,.bg-icon--search,.bg-icon--search--duotone,tcds-icon[icon~=search],tcds-icon[icon~=search][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-search)}.tcds-icon--stroller-person-woman,.tcds-icon--stroller-person-woman--duotone,.bg-icon--stroller-person-woman,.bg-icon--stroller-person-woman--duotone,tcds-icon[icon~=stroller-person-woman],tcds-icon[icon~=stroller-person-woman][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-stroller-person-woman)}.tcds-icon--stroller,.tcds-icon--stroller--duotone,.bg-icon--stroller,.bg-icon--stroller--duotone,tcds-icon[icon~=stroller],tcds-icon[icon~=stroller][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-stroller)}.tcds-icon--tablet-medical-hand,.tcds-icon--tablet-medical-hand--duotone,.bg-icon--tablet-medical-hand,.bg-icon--tablet-medical-hand--duotone,tcds-icon[icon~=tablet-medical-hand],tcds-icon[icon~=tablet-medical-hand][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-tablet-medical-hand)}.tcds-icon--video-call-man,.tcds-icon--video-call-man--duotone,.bg-icon--video-call-man,.bg-icon--video-call-man--duotone,tcds-icon[icon~=video-call-man],tcds-icon[icon~=video-call-man][category~=duotone]{--tcds-icon: var(--tcds-icon-duotone-video-call-man)}.tcds-icon--ambulance,.tcds-icon--ambulance--primary,.bg-icon--ambulance,.bg-icon--ambulance--primary,tcds-icon[icon~=ambulance],tcds-icon[icon~=ambulance][category~=primary]{--tcds-icon: var(--tcds-icon-primary-ambulance)}.tcds-icon--bed-iv-drip,.tcds-icon--bed-iv-drip--primary,.bg-icon--bed-iv-drip,.bg-icon--bed-iv-drip--primary,tcds-icon[icon~=bed-iv-drip],tcds-icon[icon~=bed-iv-drip][category~=primary]{--tcds-icon: var(--tcds-icon-primary-bed-iv-drip)}.tcds-icon--blood-pressure-monitor,.tcds-icon--blood-pressure-monitor--primary,.bg-icon--blood-pressure-monitor,.bg-icon--blood-pressure-monitor--primary,tcds-icon[icon~=blood-pressure-monitor],tcds-icon[icon~=blood-pressure-monitor][category~=primary]{--tcds-icon: var(--tcds-icon-primary-blood-pressure-monitor)}.tcds-icon--blood-sample,.tcds-icon--blood-sample--primary,.bg-icon--blood-sample,.bg-icon--blood-sample--primary,tcds-icon[icon~=blood-sample],tcds-icon[icon~=blood-sample][category~=primary]{--tcds-icon: var(--tcds-icon-primary-blood-sample)}.tcds-icon--caduceus,.tcds-icon--caduceus--primary,.bg-icon--caduceus,.bg-icon--caduceus--primary,tcds-icon[icon~=caduceus],tcds-icon[icon~=caduceus][category~=primary]{--tcds-icon: var(--tcds-icon-primary-caduceus)}.tcds-icon--calendar-check,.tcds-icon--calendar-check--primary,.bg-icon--calendar-check,.bg-icon--calendar-check--primary,tcds-icon[icon~=calendar-check],tcds-icon[icon~=calendar-check][category~=primary]{--tcds-icon: var(--tcds-icon-primary-calendar-check)}.tcds-icon--calendar-edit,.tcds-icon--calendar-edit--primary,.bg-icon--calendar-edit,.bg-icon--calendar-edit--primary,tcds-icon[icon~=calendar-edit],tcds-icon[icon~=calendar-edit][category~=primary]{--tcds-icon: var(--tcds-icon-primary-calendar-edit)}.tcds-icon--calendar-stethoscope,.tcds-icon--calendar-stethoscope--primary,.bg-icon--calendar-stethoscope,.bg-icon--calendar-stethoscope--primary,tcds-icon[icon~=calendar-stethoscope],tcds-icon[icon~=calendar-stethoscope][category~=primary]{--tcds-icon: var(--tcds-icon-primary-calendar-stethoscope)}.tcds-icon--capsule-tablet,.tcds-icon--capsule-tablet--primary,.bg-icon--capsule-tablet,.bg-icon--capsule-tablet--primary,tcds-icon[icon~=capsule-tablet],tcds-icon[icon~=capsule-tablet][category~=primary]{--tcds-icon: var(--tcds-icon-primary-capsule-tablet)}.tcds-icon--clipboard-check,.tcds-icon--clipboard-check--primary,.bg-icon--clipboard-check,.bg-icon--clipboard-check--primary,tcds-icon[icon~=clipboard-check],tcds-icon[icon~=clipboard-check][category~=primary]{--tcds-icon: var(--tcds-icon-primary-clipboard-check)}.tcds-icon--clipboard-checklist,.tcds-icon--clipboard-checklist--primary,.bg-icon--clipboard-checklist,.bg-icon--clipboard-checklist--primary,tcds-icon[icon~=clipboard-checklist],tcds-icon[icon~=clipboard-checklist][category~=primary]{--tcds-icon: var(--tcds-icon-primary-clipboard-checklist)}.tcds-icon--cooler-medical,.tcds-icon--cooler-medical--primary,.bg-icon--cooler-medical,.bg-icon--cooler-medical--primary,tcds-icon[icon~=cooler-medical],tcds-icon[icon~=cooler-medical][category~=primary]{--tcds-icon: var(--tcds-icon-primary-cooler-medical)}.tcds-icon--crutches,.tcds-icon--crutches--primary,.bg-icon--crutches,.bg-icon--crutches--primary,tcds-icon[icon~=crutches],tcds-icon[icon~=crutches][category~=primary]{--tcds-icon: var(--tcds-icon-primary-crutches)}.tcds-icon--ecg-report,.tcds-icon--ecg-report--primary,.bg-icon--ecg-report,.bg-icon--ecg-report--primary,tcds-icon[icon~=ecg-report],tcds-icon[icon~=ecg-report][category~=primary]{--tcds-icon: var(--tcds-icon-primary-ecg-report)}.tcds-icon--folder-medical,.tcds-icon--folder-medical--primary,.bg-icon--folder-medical,.bg-icon--folder-medical--primary,tcds-icon[icon~=folder-medical],tcds-icon[icon~=folder-medical][category~=primary]{--tcds-icon: var(--tcds-icon-primary-folder-medical)}.tcds-icon--hands-medical,.tcds-icon--hands-medical--primary,.bg-icon--hands-medical,.bg-icon--hands-medical--primary,tcds-icon[icon~=hands-medical],tcds-icon[icon~=hands-medical][category~=primary]{--tcds-icon: var(--tcds-icon-primary-hands-medical)}.tcds-icon--head-brain,.tcds-icon--head-brain--primary,.bg-icon--head-brain,.bg-icon--head-brain--primary,tcds-icon[icon~=head-brain],tcds-icon[icon~=head-brain][category~=primary]{--tcds-icon: var(--tcds-icon-primary-head-brain)}.tcds-icon--head-medical,.tcds-icon--head-medical--primary,.bg-icon--head-medical,.bg-icon--head-medical--primary,tcds-icon[icon~=head-medical],tcds-icon[icon~=head-medical][category~=primary]{--tcds-icon: var(--tcds-icon-primary-head-medical)}.tcds-icon--heart-pulse,.tcds-icon--heart-pulse--primary,.bg-icon--heart-pulse,.bg-icon--heart-pulse--primary,tcds-icon[icon~=heart-pulse],tcds-icon[icon~=heart-pulse][category~=primary]{--tcds-icon: var(--tcds-icon-primary-heart-pulse)}.tcds-icon--helicopter,.tcds-icon--helicopter--primary,.bg-icon--helicopter,.bg-icon--helicopter--primary,tcds-icon[icon~=helicopter],tcds-icon[icon~=helicopter][category~=primary]{--tcds-icon: var(--tcds-icon-primary-helicopter)}.tcds-icon--hospital,.tcds-icon--hospital--primary,.bg-icon--hospital,.bg-icon--hospital--primary,tcds-icon[icon~=hospital],tcds-icon[icon~=hospital][category~=primary]{--tcds-icon: var(--tcds-icon-primary-hospital)}.tcds-icon--iv-drip,.tcds-icon--iv-drip--primary,.bg-icon--iv-drip,.bg-icon--iv-drip--primary,tcds-icon[icon~=iv-drip],tcds-icon[icon~=iv-drip][category~=primary]{--tcds-icon: var(--tcds-icon-primary-iv-drip)}.tcds-icon--laptop-medical,.tcds-icon--laptop-medical--primary,.bg-icon--laptop-medical,.bg-icon--laptop-medical--primary,tcds-icon[icon~=laptop-medical],tcds-icon[icon~=laptop-medical][category~=primary]{--tcds-icon: var(--tcds-icon-primary-laptop-medical)}.tcds-icon--laptop-stethoscope,.tcds-icon--laptop-stethoscope--primary,.bg-icon--laptop-stethoscope,.bg-icon--laptop-stethoscope--primary,tcds-icon[icon~=laptop-stethoscope],tcds-icon[icon~=laptop-stethoscope][category~=primary]{--tcds-icon: var(--tcds-icon-primary-laptop-stethoscope)}.tcds-icon--location-pin-ground,.tcds-icon--location-pin-ground--primary,.bg-icon--location-pin-ground,.bg-icon--location-pin-ground--primary,tcds-icon[icon~=location-pin-ground],tcds-icon[icon~=location-pin-ground][category~=primary]{--tcds-icon: var(--tcds-icon-primary-location-pin-ground)}.tcds-icon--location-pin,.tcds-icon--location-pin--primary,.bg-icon--location-pin,.bg-icon--location-pin--primary,tcds-icon[icon~=location-pin],tcds-icon[icon~=location-pin][category~=primary]{--tcds-icon: var(--tcds-icon-primary-location-pin)}.tcds-icon--mammography-machine,.tcds-icon--mammography-machine--primary,.bg-icon--mammography-machine,.bg-icon--mammography-machine--primary,tcds-icon[icon~=mammography-machine],tcds-icon[icon~=mammography-machine][category~=primary]{--tcds-icon: var(--tcds-icon-primary-mammography-machine)}.tcds-icon--medical-cross-circle,.tcds-icon--medical-cross-circle--primary,.bg-icon--medical-cross-circle,.bg-icon--medical-cross-circle--primary,tcds-icon[icon~=medical-cross-circle],tcds-icon[icon~=medical-cross-circle][category~=primary]{--tcds-icon: var(--tcds-icon-primary-medical-cross-circle)}.tcds-icon--medical-kit,.tcds-icon--medical-kit--primary,.bg-icon--medical-kit,.bg-icon--medical-kit--primary,tcds-icon[icon~=medical-kit],tcds-icon[icon~=medical-kit][category~=primary]{--tcds-icon: var(--tcds-icon-primary-medical-kit)}.tcds-icon--microscope-checklist,.tcds-icon--microscope-checklist--primary,.bg-icon--microscope-checklist,.bg-icon--microscope-checklist--primary,tcds-icon[icon~=microscope-checklist],tcds-icon[icon~=microscope-checklist][category~=primary]{--tcds-icon: var(--tcds-icon-primary-microscope-checklist)}.tcds-icon--people-hug,.tcds-icon--people-hug--primary,.bg-icon--people-hug,.bg-icon--people-hug--primary,tcds-icon[icon~=people-hug],tcds-icon[icon~=people-hug][category~=primary]{--tcds-icon: var(--tcds-icon-primary-people-hug)}.tcds-icon--person-search,.tcds-icon--person-search--primary,.bg-icon--person-search,.bg-icon--person-search--primary,tcds-icon[icon~=person-search],tcds-icon[icon~=person-search][category~=primary]{--tcds-icon: var(--tcds-icon-primary-person-search)}.tcds-icon--personnel-doctor-chat-man,.tcds-icon--personnel-doctor-chat-man--primary,.bg-icon--personnel-doctor-chat-man,.bg-icon--personnel-doctor-chat-man--primary,tcds-icon[icon~=personnel-doctor-chat-man],tcds-icon[icon~=personnel-doctor-chat-man][category~=primary]{--tcds-icon: var(--tcds-icon-primary-personnel-doctor-chat-man)}.tcds-icon--personnel-doctor-man,.tcds-icon--personnel-doctor-man--primary,.bg-icon--personnel-doctor-man,.bg-icon--personnel-doctor-man--primary,tcds-icon[icon~=personnel-doctor-man],tcds-icon[icon~=personnel-doctor-man][category~=primary]{--tcds-icon: var(--tcds-icon-primary-personnel-doctor-man)}.tcds-icon--personnel-nurse-woman,.tcds-icon--personnel-nurse-woman--primary,.bg-icon--personnel-nurse-woman,.bg-icon--personnel-nurse-woman--primary,tcds-icon[icon~=personnel-nurse-woman],tcds-icon[icon~=personnel-nurse-woman][category~=primary]{--tcds-icon: var(--tcds-icon-primary-personnel-nurse-woman)}.tcds-icon--personnel-surgeon,.tcds-icon--personnel-surgeon--primary,.bg-icon--personnel-surgeon,.bg-icon--personnel-surgeon--primary,tcds-icon[icon~=personnel-surgeon],tcds-icon[icon~=personnel-surgeon][category~=primary]{--tcds-icon: var(--tcds-icon-primary-personnel-surgeon)}.tcds-icon--phone-heart-pulse,.tcds-icon--phone-heart-pulse--primary,.bg-icon--phone-heart-pulse,.bg-icon--phone-heart-pulse--primary,tcds-icon[icon~=phone-heart-pulse],tcds-icon[icon~=phone-heart-pulse][category~=primary]{--tcds-icon: var(--tcds-icon-primary-phone-heart-pulse)}.tcds-icon--phone-medical,.tcds-icon--phone-medical--primary,.bg-icon--phone-medical,.bg-icon--phone-medical--primary,tcds-icon[icon~=phone-medical],tcds-icon[icon~=phone-medical][category~=primary]{--tcds-icon: var(--tcds-icon-primary-phone-medical)}.tcds-icon--phone-person,.tcds-icon--phone-person--primary,.bg-icon--phone-person,.bg-icon--phone-person--primary,tcds-icon[icon~=phone-person],tcds-icon[icon~=phone-person][category~=primary]{--tcds-icon: var(--tcds-icon-primary-phone-person)}.tcds-icon--radiation,.tcds-icon--radiation--primary,.bg-icon--radiation,.bg-icon--radiation--primary,tcds-icon[icon~=radiation],tcds-icon[icon~=radiation][category~=primary]{--tcds-icon: var(--tcds-icon-primary-radiation)}.tcds-icon--scan-bone-broken,.tcds-icon--scan-bone-broken--primary,.bg-icon--scan-bone-broken,.bg-icon--scan-bone-broken--primary,tcds-icon[icon~=scan-bone-broken],tcds-icon[icon~=scan-bone-broken][category~=primary]{--tcds-icon: var(--tcds-icon-primary-scan-bone-broken)}.tcds-icon--scan-bone,.tcds-icon--scan-bone--primary,.bg-icon--scan-bone,.bg-icon--scan-bone--primary,tcds-icon[icon~=scan-bone],tcds-icon[icon~=scan-bone][category~=primary]{--tcds-icon: var(--tcds-icon-primary-scan-bone)}.tcds-icon--scan-lungs,.tcds-icon--scan-lungs--primary,.bg-icon--scan-lungs,.bg-icon--scan-lungs--primary,tcds-icon[icon~=scan-lungs],tcds-icon[icon~=scan-lungs][category~=primary]{--tcds-icon: var(--tcds-icon-primary-scan-lungs)}.tcds-icon--scan-skull,.tcds-icon--scan-skull--primary,.bg-icon--scan-skull,.bg-icon--scan-skull--primary,tcds-icon[icon~=scan-skull],tcds-icon[icon~=scan-skull][category~=primary]{--tcds-icon: var(--tcds-icon-primary-scan-skull)}.tcds-icon--scan-tooth,.tcds-icon--scan-tooth--primary,.bg-icon--scan-tooth,.bg-icon--scan-tooth--primary,tcds-icon[icon~=scan-tooth],tcds-icon[icon~=scan-tooth][category~=primary]{--tcds-icon: var(--tcds-icon-primary-scan-tooth)}.tcds-icon--scan-torso,.tcds-icon--scan-torso--primary,.bg-icon--scan-torso,.bg-icon--scan-torso--primary,tcds-icon[icon~=scan-torso],tcds-icon[icon~=scan-torso][category~=primary]{--tcds-icon: var(--tcds-icon-primary-scan-torso)}.tcds-icon--scanner-c-arm,.tcds-icon--scanner-c-arm--primary,.bg-icon--scanner-c-arm,.bg-icon--scanner-c-arm--primary,tcds-icon[icon~=scanner-c-arm],tcds-icon[icon~=scanner-c-arm][category~=primary]{--tcds-icon: var(--tcds-icon-primary-scanner-c-arm)}.tcds-icon--scanner-chair,.tcds-icon--scanner-chair--primary,.bg-icon--scanner-chair,.bg-icon--scanner-chair--primary,tcds-icon[icon~=scanner-chair],tcds-icon[icon~=scanner-chair][category~=primary]{--tcds-icon: var(--tcds-icon-primary-scanner-chair)}.tcds-icon--scanner-front,.tcds-icon--scanner-front--primary,.bg-icon--scanner-front,.bg-icon--scanner-front--primary,tcds-icon[icon~=scanner-front],tcds-icon[icon~=scanner-front][category~=primary]{--tcds-icon: var(--tcds-icon-primary-scanner-front)}.tcds-icon--scanner-patient,.tcds-icon--scanner-patient--primary,.bg-icon--scanner-patient,.bg-icon--scanner-patient--primary,tcds-icon[icon~=scanner-patient],tcds-icon[icon~=scanner-patient][category~=primary]{--tcds-icon: var(--tcds-icon-primary-scanner-patient)}.tcds-icon--scanner-side-vial,.tcds-icon--scanner-side-vial--primary,.bg-icon--scanner-side-vial,.bg-icon--scanner-side-vial--primary,tcds-icon[icon~=scanner-side-vial],tcds-icon[icon~=scanner-side-vial][category~=primary]{--tcds-icon: var(--tcds-icon-primary-scanner-side-vial)}.tcds-icon--scanner-side,.tcds-icon--scanner-side--primary,.bg-icon--scanner-side,.bg-icon--scanner-side--primary,tcds-icon[icon~=scanner-side],tcds-icon[icon~=scanner-side][category~=primary]{--tcds-icon: var(--tcds-icon-primary-scanner-side)}.tcds-icon--scanner-table,.tcds-icon--scanner-table--primary,.bg-icon--scanner-table,.bg-icon--scanner-table--primary,tcds-icon[icon~=scanner-table],tcds-icon[icon~=scanner-table][category~=primary]{--tcds-icon: var(--tcds-icon-primary-scanner-table)}.tcds-icon--scanner-tunnel,.tcds-icon--scanner-tunnel--primary,.bg-icon--scanner-tunnel,.bg-icon--scanner-tunnel--primary,tcds-icon[icon~=scanner-tunnel],tcds-icon[icon~=scanner-tunnel][category~=primary]{--tcds-icon: var(--tcds-icon-primary-scanner-tunnel)}.tcds-icon--search-eye,.tcds-icon--search-eye--primary,.bg-icon--search-eye,.bg-icon--search-eye--primary,tcds-icon[icon~=search-eye],tcds-icon[icon~=search-eye][category~=primary]{--tcds-icon: var(--tcds-icon-primary-search-eye)}.tcds-icon--search-heart,.tcds-icon--search-heart--primary,.bg-icon--search-heart,.bg-icon--search-heart--primary,tcds-icon[icon~=search-heart],tcds-icon[icon~=search-heart][category~=primary]{--tcds-icon: var(--tcds-icon-primary-search-heart)}.tcds-icon--sex-symbols,.tcds-icon--sex-symbols--primary,.bg-icon--sex-symbols,.bg-icon--sex-symbols--primary,tcds-icon[icon~=sex-symbols],tcds-icon[icon~=sex-symbols][category~=primary]{--tcds-icon: var(--tcds-icon-primary-sex-symbols)}.tcds-icon--stethoscope,.tcds-icon--stethoscope--primary,.bg-icon--stethoscope,.bg-icon--stethoscope--primary,tcds-icon[icon~=stethoscope],tcds-icon[icon~=stethoscope][category~=primary]{--tcds-icon: var(--tcds-icon-primary-stethoscope)}.tcds-icon--stomach-endoscope,.tcds-icon--stomach-endoscope--primary,.bg-icon--stomach-endoscope,.bg-icon--stomach-endoscope--primary,tcds-icon[icon~=stomach-endoscope],tcds-icon[icon~=stomach-endoscope][category~=primary]{--tcds-icon: var(--tcds-icon-primary-stomach-endoscope)}.tcds-icon--stretcher,.tcds-icon--stretcher--primary,.bg-icon--stretcher,.bg-icon--stretcher--primary,tcds-icon[icon~=stretcher],tcds-icon[icon~=stretcher][category~=primary]{--tcds-icon: var(--tcds-icon-primary-stretcher)}.tcds-icon--syringe,.tcds-icon--syringe--primary,.bg-icon--syringe,.bg-icon--syringe--primary,tcds-icon[icon~=syringe],tcds-icon[icon~=syringe][category~=primary]{--tcds-icon: var(--tcds-icon-primary-syringe)}.tcds-icon--ultrasound-console,.tcds-icon--ultrasound-console--primary,.bg-icon--ultrasound-console,.bg-icon--ultrasound-console--primary,tcds-icon[icon~=ultrasound-console],tcds-icon[icon~=ultrasound-console][category~=primary]{--tcds-icon: var(--tcds-icon-primary-ultrasound-console)}.tcds-icon--ultrasound-probe,.tcds-icon--ultrasound-probe--primary,.bg-icon--ultrasound-probe,.bg-icon--ultrasound-probe--primary,tcds-icon[icon~=ultrasound-probe],tcds-icon[icon~=ultrasound-probe][category~=primary]{--tcds-icon: var(--tcds-icon-primary-ultrasound-probe)}.tcds-icon--uterus-ovaries,.tcds-icon--uterus-ovaries--primary,.bg-icon--uterus-ovaries,.bg-icon--uterus-ovaries--primary,tcds-icon[icon~=uterus-ovaries],tcds-icon[icon~=uterus-ovaries][category~=primary]{--tcds-icon: var(--tcds-icon-primary-uterus-ovaries)}.tcds-icon--virus,.tcds-icon--virus--primary,.bg-icon--virus,.bg-icon--virus--primary,tcds-icon[icon~=virus],tcds-icon[icon~=virus][category~=primary]{--tcds-icon: var(--tcds-icon-primary-virus)}.tcds-icon--wheelchair-assistance,.tcds-icon--wheelchair-assistance--primary,.bg-icon--wheelchair-assistance,.bg-icon--wheelchair-assistance--primary,tcds-icon[icon~=wheelchair-assistance],tcds-icon[icon~=wheelchair-assistance][category~=primary]{--tcds-icon: var(--tcds-icon-primary-wheelchair-assistance)}.tcds-icon--wheelchair,.tcds-icon--wheelchair--primary,.bg-icon--wheelchair,.bg-icon--wheelchair--primary,tcds-icon[icon~=wheelchair],tcds-icon[icon~=wheelchair][category~=primary]{--tcds-icon: var(--tcds-icon-primary-wheelchair)}.tcds-icon--x-ray-machine,.tcds-icon--x-ray-machine--primary,.bg-icon--x-ray-machine,.bg-icon--x-ray-machine--primary,tcds-icon[icon~=x-ray-machine],tcds-icon[icon~=x-ray-machine][category~=primary]{--tcds-icon: var(--tcds-icon-primary-x-ray-machine)}.tcds-icon--arrow-down,.tcds-icon--arrow-down--utility,.bg-icon--arrow-down,.bg-icon--arrow-down--utility,tcds-icon[icon~=arrow-down],tcds-icon[icon~=arrow-down][category~=utility]{--tcds-icon: var(--tcds-icon-utility-arrow-down)}.tcds-icon--arrow-left,.tcds-icon--arrow-left--utility,.bg-icon--arrow-left,.bg-icon--arrow-left--utility,tcds-icon[icon~=arrow-left],tcds-icon[icon~=arrow-left][category~=utility]{--tcds-icon: var(--tcds-icon-utility-arrow-left)}.tcds-icon--arrow-right,.tcds-icon--arrow-right--utility,.bg-icon--arrow-right,.bg-icon--arrow-right--utility,tcds-icon[icon~=arrow-right],tcds-icon[icon~=arrow-right][category~=utility]{--tcds-icon: var(--tcds-icon-utility-arrow-right)}.tcds-icon--arrow-up,.tcds-icon--arrow-up--utility,.bg-icon--arrow-up,.bg-icon--arrow-up--utility,tcds-icon[icon~=arrow-up],tcds-icon[icon~=arrow-up][category~=utility]{--tcds-icon: var(--tcds-icon-utility-arrow-up)}.tcds-icon--caret-down-small,.tcds-icon--caret-down-small--utility,.bg-icon--caret-down-small,.bg-icon--caret-down-small--utility,tcds-icon[icon~=caret-down-small],tcds-icon[icon~=caret-down-small][category~=utility]{--tcds-icon: var(--tcds-icon-utility-caret-down-small)}.tcds-icon--caret-down,.tcds-icon--caret-down--utility,.bg-icon--caret-down,.bg-icon--caret-down--utility,tcds-icon[icon~=caret-down],tcds-icon[icon~=caret-down][category~=utility]{--tcds-icon: var(--tcds-icon-utility-caret-down)}.tcds-icon--caret-left-small,.tcds-icon--caret-left-small--utility,.bg-icon--caret-left-small,.bg-icon--caret-left-small--utility,tcds-icon[icon~=caret-left-small],tcds-icon[icon~=caret-left-small][category~=utility]{--tcds-icon: var(--tcds-icon-utility-caret-left-small)}.tcds-icon--caret-left,.tcds-icon--caret-left--utility,.bg-icon--caret-left,.bg-icon--caret-left--utility,tcds-icon[icon~=caret-left],tcds-icon[icon~=caret-left][category~=utility]{--tcds-icon: var(--tcds-icon-utility-caret-left)}.tcds-icon--caret-right-small,.tcds-icon--caret-right-small--utility,.bg-icon--caret-right-small,.bg-icon--caret-right-small--utility,tcds-icon[icon~=caret-right-small],tcds-icon[icon~=caret-right-small][category~=utility]{--tcds-icon: var(--tcds-icon-utility-caret-right-small)}.tcds-icon--caret-right,.tcds-icon--caret-right--utility,.bg-icon--caret-right,.bg-icon--caret-right--utility,tcds-icon[icon~=caret-right],tcds-icon[icon~=caret-right][category~=utility]{--tcds-icon: var(--tcds-icon-utility-caret-right)}.tcds-icon--caret-up-small,.tcds-icon--caret-up-small--utility,.bg-icon--caret-up-small,.bg-icon--caret-up-small--utility,tcds-icon[icon~=caret-up-small],tcds-icon[icon~=caret-up-small][category~=utility]{--tcds-icon: var(--tcds-icon-utility-caret-up-small)}.tcds-icon--caret-up,.tcds-icon--caret-up--utility,.bg-icon--caret-up,.bg-icon--caret-up--utility,tcds-icon[icon~=caret-up],tcds-icon[icon~=caret-up][category~=utility]{--tcds-icon: var(--tcds-icon-utility-caret-up)}.tcds-icon--check,.tcds-icon--check--utility,.bg-icon--check,.bg-icon--check--utility,tcds-icon[icon~=check],tcds-icon[icon~=check][category~=utility]{--tcds-icon: var(--tcds-icon-utility-check)}.tcds-icon--close,.tcds-icon--close--utility,.bg-icon--close,.bg-icon--close--utility,tcds-icon[icon~=close],tcds-icon[icon~=close][category~=utility]{--tcds-icon: var(--tcds-icon-utility-close)}.tcds-icon--desktop,.tcds-icon--desktop--utility,.bg-icon--desktop,.bg-icon--desktop--utility,tcds-icon[icon~=desktop],tcds-icon[icon~=desktop][category~=utility]{--tcds-icon: var(--tcds-icon-utility-desktop)}.tcds-icon--download,.tcds-icon--download--utility,.bg-icon--download,.bg-icon--download--utility,tcds-icon[icon~=download],tcds-icon[icon~=download][category~=utility]{--tcds-icon: var(--tcds-icon-utility-download)}.tcds-icon--error,.tcds-icon--error--utility,.bg-icon--error,.bg-icon--error--utility,tcds-icon[icon~=error],tcds-icon[icon~=error][category~=utility]{--tcds-icon: var(--tcds-icon-utility-error)}.tcds-icon--external,.tcds-icon--external--utility,.bg-icon--external,.bg-icon--external--utility,tcds-icon[icon~=external],tcds-icon[icon~=external][category~=utility]{--tcds-icon: var(--tcds-icon-utility-external)}.tcds-icon--filter,.tcds-icon--filter--utility,.bg-icon--filter,.bg-icon--filter--utility,tcds-icon[icon~=filter],tcds-icon[icon~=filter][category~=utility]{--tcds-icon: var(--tcds-icon-utility-filter)}.tcds-icon--geolocate,.tcds-icon--geolocate--utility,.bg-icon--geolocate,.bg-icon--geolocate--utility,tcds-icon[icon~=geolocate],tcds-icon[icon~=geolocate][category~=utility]{--tcds-icon: var(--tcds-icon-utility-geolocate)}.tcds-icon--grabber,.tcds-icon--grabber--utility,.bg-icon--grabber,.bg-icon--grabber--utility,tcds-icon[icon~=grabber],tcds-icon[icon~=grabber][category~=utility]{--tcds-icon: var(--tcds-icon-utility-grabber)}.tcds-icon--info,.tcds-icon--info--utility,.bg-icon--info,.bg-icon--info--utility,tcds-icon[icon~=info],tcds-icon[icon~=info][category~=utility]{--tcds-icon: var(--tcds-icon-utility-info)}.tcds-icon--laptop,.tcds-icon--laptop--utility,.bg-icon--laptop,.bg-icon--laptop--utility,tcds-icon[icon~=laptop],tcds-icon[icon~=laptop][category~=utility]{--tcds-icon: var(--tcds-icon-utility-laptop)}.tcds-icon--list,.tcds-icon--list--utility,.bg-icon--list,.bg-icon--list--utility,tcds-icon[icon~=list],tcds-icon[icon~=list][category~=utility]{--tcds-icon: var(--tcds-icon-utility-list)}.tcds-icon--menu,.tcds-icon--menu--utility,.bg-icon--menu,.bg-icon--menu--utility,tcds-icon[icon~=menu],tcds-icon[icon~=menu][category~=utility]{--tcds-icon: var(--tcds-icon-utility-menu)}.tcds-icon--minus,.tcds-icon--minus--utility,.bg-icon--minus,.bg-icon--minus--utility,tcds-icon[icon~=minus],tcds-icon[icon~=minus][category~=utility]{--tcds-icon: var(--tcds-icon-utility-minus)}.tcds-icon--mobile,.tcds-icon--mobile--utility,.bg-icon--mobile,.bg-icon--mobile--utility,tcds-icon[icon~=mobile],tcds-icon[icon~=mobile][category~=utility]{--tcds-icon: var(--tcds-icon-utility-mobile)}.tcds-icon--pause,.tcds-icon--pause--utility,.bg-icon--pause,.bg-icon--pause--utility,tcds-icon[icon~=pause],tcds-icon[icon~=pause][category~=utility]{--tcds-icon: var(--tcds-icon-utility-pause)}.tcds-icon--pin-filled,.tcds-icon--pin-filled--utility,.bg-icon--pin-filled,.bg-icon--pin-filled--utility,tcds-icon[icon~=pin-filled],tcds-icon[icon~=pin-filled][category~=utility]{--tcds-icon: var(--tcds-icon-utility-pin-filled)}.tcds-icon--pin,.tcds-icon--pin--utility,.bg-icon--pin,.bg-icon--pin--utility,tcds-icon[icon~=pin],tcds-icon[icon~=pin][category~=utility]{--tcds-icon: var(--tcds-icon-utility-pin)}.tcds-icon--play,.tcds-icon--play--utility,.bg-icon--play,.bg-icon--play--utility,tcds-icon[icon~=play],tcds-icon[icon~=play][category~=utility]{--tcds-icon: var(--tcds-icon-utility-play)}.tcds-icon--plus,.tcds-icon--plus--utility,.bg-icon--plus,.bg-icon--plus--utility,tcds-icon[icon~=plus],tcds-icon[icon~=plus][category~=utility]{--tcds-icon: var(--tcds-icon-utility-plus)}.tcds-icon--quotation,.tcds-icon--quotation--utility,.bg-icon--quotation,.bg-icon--quotation--utility,tcds-icon[icon~=quotation],tcds-icon[icon~=quotation][category~=utility]{--tcds-icon: var(--tcds-icon-utility-quotation)}.tcds-icon--search,.tcds-icon--search--utility,.bg-icon--search,.bg-icon--search--utility,tcds-icon[icon~=search],tcds-icon[icon~=search][category~=utility]{--tcds-icon: var(--tcds-icon-utility-search)}.tcds-icon--star,.tcds-icon--star--utility,.bg-icon--star,.bg-icon--star--utility,tcds-icon[icon~=star],tcds-icon[icon~=star][category~=utility]{--tcds-icon: var(--tcds-icon-utility-star)}.tcds-icon--stop,.tcds-icon--stop--utility,.bg-icon--stop,.bg-icon--stop--utility,tcds-icon[icon~=stop],tcds-icon[icon~=stop][category~=utility]{--tcds-icon: var(--tcds-icon-utility-stop)}.tcds-icon--tablet,.tcds-icon--tablet--utility,.bg-icon--tablet,.bg-icon--tablet--utility,tcds-icon[icon~=tablet],tcds-icon[icon~=tablet][category~=utility]{--tcds-icon: var(--tcds-icon-utility-tablet)}.justify-content-start{justify-content:start !important}.justify-self-start{justify-self:start !important}.justify-content-end{justify-content:end !important}.justify-self-end{justify-self:end !important}.justify-content-center{justify-content:center !important}.justify-self-center{justify-self:center !important}.justify-content-space-between{justify-content:space-between !important}.justify-self-space-between{justify-self:space-between !important}.align-items-start{align-items:start !important}.align-self-start{align-self:start !important}.align-items-end{align-items:end !important}.align-self-end{align-self:end !important}.align-items-center{align-items:center !important}.align-self-center{align-self:center !important}.align-items-stretch{align-items:stretch !important}.align-self-stretch{align-self:stretch !important}.float-left{float:left !important;margin:0 var(--tcds-space-component-md) var(--tcds-space-component-md) 0}.float-right{float:right !important;margin:0 0 var(--tcds-space-component-md) var(--tcds-space-component-md)}@media(min-width: 320px){.xs\\:justify-content-start{justify-content:start !important}.xs\\:justify-self-start{justify-self:start !important}.xs\\:justify-content-end{justify-content:end !important}.xs\\:justify-self-end{justify-self:end !important}.xs\\:justify-content-center{justify-content:center !important}.xs\\:justify-self-center{justify-self:center !important}.xs\\:justify-content-space-between{justify-content:space-between !important}.xs\\:justify-self-space-between{justify-self:space-between !important}.xs\\:align-items-start{align-items:start !important}.xs\\:align-self-start{align-self:start !important}.xs\\:align-items-end{align-items:end !important}.xs\\:align-self-end{align-self:end !important}.xs\\:align-items-center{align-items:center !important}.xs\\:align-self-center{align-self:center !important}.xs\\:align-items-stretch{align-items:stretch !important}.xs\\:align-self-stretch{align-self:stretch !important}.xs\\:float-left{float:left !important;margin:0 var(--tcds-space-component-md) var(--tcds-space-component-md) 0}.xs\\:float-right{float:right !important;margin:0 0 var(--tcds-space-component-md) var(--tcds-space-component-md)}}@media(min-width: 640px){.sm\\:justify-content-start{justify-content:start !important}.sm\\:justify-self-start{justify-self:start !important}.sm\\:justify-content-end{justify-content:end !important}.sm\\:justify-self-end{justify-self:end !important}.sm\\:justify-content-center{justify-content:center !important}.sm\\:justify-self-center{justify-self:center !important}.sm\\:justify-content-space-between{justify-content:space-between !important}.sm\\:justify-self-space-between{justify-self:space-between !important}.sm\\:align-items-start{align-items:start !important}.sm\\:align-self-start{align-self:start !important}.sm\\:align-items-end{align-items:end !important}.sm\\:align-self-end{align-self:end !important}.sm\\:align-items-center{align-items:center !important}.sm\\:align-self-center{align-self:center !important}.sm\\:align-items-stretch{align-items:stretch !important}.sm\\:align-self-stretch{align-self:stretch !important}.sm\\:float-left{float:left !important;margin:0 var(--tcds-space-component-md) var(--tcds-space-component-md) 0}.sm\\:float-right{float:right !important;margin:0 0 var(--tcds-space-component-md) var(--tcds-space-component-md)}}@media(min-width: 960px){.md\\:justify-content-start{justify-content:start !important}.md\\:justify-self-start{justify-self:start !important}.md\\:justify-content-end{justify-content:end !important}.md\\:justify-self-end{justify-self:end !important}.md\\:justify-content-center{justify-content:center !important}.md\\:justify-self-center{justify-self:center !important}.md\\:justify-content-space-between{justify-content:space-between !important}.md\\:justify-self-space-between{justify-self:space-between !important}.md\\:align-items-start{align-items:start !important}.md\\:align-self-start{align-self:start !important}.md\\:align-items-end{align-items:end !important}.md\\:align-self-end{align-self:end !important}.md\\:align-items-center{align-items:center !important}.md\\:align-self-center{align-self:center !important}.md\\:align-items-stretch{align-items:stretch !important}.md\\:align-self-stretch{align-self:stretch !important}.md\\:float-left{float:left !important;margin:0 var(--tcds-space-component-md) var(--tcds-space-component-md) 0}.md\\:float-right{float:right !important;margin:0 0 var(--tcds-space-component-md) var(--tcds-space-component-md)}}@media(min-width: 1312px){.lg\\:justify-content-start{justify-content:start !important}.lg\\:justify-self-start{justify-self:start !important}.lg\\:justify-content-end{justify-content:end !important}.lg\\:justify-self-end{justify-self:end !important}.lg\\:justify-content-center{justify-content:center !important}.lg\\:justify-self-center{justify-self:center !important}.lg\\:justify-content-space-between{justify-content:space-between !important}.lg\\:justify-self-space-between{justify-self:space-between !important}.lg\\:align-items-start{align-items:start !important}.lg\\:align-self-start{align-self:start !important}.lg\\:align-items-end{align-items:end !important}.lg\\:align-self-end{align-self:end !important}.lg\\:align-items-center{align-items:center !important}.lg\\:align-self-center{align-self:center !important}.lg\\:align-items-stretch{align-items:stretch !important}.lg\\:align-self-stretch{align-self:stretch !important}.lg\\:float-left{float:left !important;margin:0 var(--tcds-space-component-md) var(--tcds-space-component-md) 0}.lg\\:float-right{float:right !important;margin:0 0 var(--tcds-space-component-md) var(--tcds-space-component-md)}}.container-xs{--tcds-size-container: var(--tcds-size-layout-xs)}.container-sm{--tcds-size-container: var(--tcds-size-layout-sm)}.container-md{--tcds-size-container: var(--tcds-size-layout-md)}.container-lg{--tcds-size-container: var(--tcds-size-layout-lg)}.container-xl{--tcds-size-container: var(--tcds-size-layout-xl)}.container-xs,.container-sm,.container-md,.container-lg,.container-xl{--_tcds-container-gutter: var(--tcds-container-gutter, var(--tcds-site-inner-gutter));--_tcds-size-container: var(--tcds-size-container, var(--tcds-size-layout-lg));width:calc(100% - var(--_tcds-container-gutter)*2) !important;max-width:var(--_tcds-size-container) !important;margin-inline:var(--tcds-container-margin-inline, auto) !important;padding:0 !important;position:relative}.flex{display:flex !important}.inline-flex{display:inline-flex !important}.flex:not(.flex--no-wrap){flex-wrap:wrap !important}.flex--column{flex-direction:column !important}.flex-1-0{flex:1 0}.flex--row-reverse{flex-direction:row-reverse !important}@media(min-width: 320px){.xs\\:flex--row{flex-direction:row !important}.xs\\:flex--row-reverse{flex-direction:row-reverse !important}}@media(min-width: 640px){.sm\\:flex--row{flex-direction:row !important}.sm\\:flex--row-reverse{flex-direction:row-reverse !important}}@media(min-width: 960px){.md\\:flex--row{flex-direction:row !important}.md\\:flex--row-reverse{flex-direction:row-reverse !important}}@media(min-width: 1312px){.lg\\:flex--row{flex-direction:row !important}.lg\\:flex--row-reverse{flex-direction:row-reverse !important}}.grid{display:grid !important;grid-template-columns:repeat(12, 1fr)}:where(.grid>*){--grid-item-column-span: 12;grid-column:span var(--grid-item-column-span)}.grid-item--1\\/1{--grid-item-column-span: 12}.grid-item--1\\/2{--grid-item-column-span: 6}.grid-item--1\\/3{--grid-item-column-span: 4}.grid-item--2\\/3{--grid-item-column-span: 8}.grid-item--1\\/4{--grid-item-column-span: 3}.grid-item--3\\/4{--grid-item-column-span: 9}@media(min-width: 320px){.xs\\:grid-item--1\\/1{--grid-item-column-span: 12}.xs\\:grid-item--1\\/2{--grid-item-column-span: 6}.xs\\:grid-item--1\\/3{--grid-item-column-span: 4}.xs\\:grid-item--2\\/3{--grid-item-column-span: 8}.xs\\:grid-item--1\\/4{--grid-item-column-span: 3}.xs\\:grid-item--3\\/4{--grid-item-column-span: 9}}@media(min-width: 640px){.sm\\:grid-item--1\\/1{--grid-item-column-span: 12}.sm\\:grid-item--1\\/2{--grid-item-column-span: 6}.sm\\:grid-item--1\\/3{--grid-item-column-span: 4}.sm\\:grid-item--2\\/3{--grid-item-column-span: 8}.sm\\:grid-item--1\\/4{--grid-item-column-span: 3}.sm\\:grid-item--3\\/4{--grid-item-column-span: 9}}@media(min-width: 960px){.md\\:grid-item--1\\/1{--grid-item-column-span: 12}.md\\:grid-item--1\\/2{--grid-item-column-span: 6}.md\\:grid-item--1\\/3{--grid-item-column-span: 4}.md\\:grid-item--2\\/3{--grid-item-column-span: 8}.md\\:grid-item--1\\/4{--grid-item-column-span: 3}.md\\:grid-item--3\\/4{--grid-item-column-span: 9}}@media(min-width: 1312px){.lg\\:grid-item--1\\/1{--grid-item-column-span: 12}.lg\\:grid-item--1\\/2{--grid-item-column-span: 6}.lg\\:grid-item--1\\/3{--grid-item-column-span: 4}.lg\\:grid-item--2\\/3{--grid-item-column-span: 8}.lg\\:grid-item--1\\/4{--grid-item-column-span: 3}.lg\\:grid-item--3\\/4{--grid-item-column-span: 9}}[hidden]:where(:not([hidden=until-found])){display:none !important}.hidden{display:none !important}@media(min-width: 320px){.xs\\:hidden{display:none !important}}@media(min-width: 640px){.sm\\:hidden{display:none !important}}@media(min-width: 960px){.md\\:hidden{display:none !important}}@media(min-width: 1312px){.lg\\:hidden{display:none !important}}.visually-hidden:not(:focus){clip:rect(0, 0, 0, 0);clip-path:inset(50%);height:1px;width:1px;position:absolute}.visually-hidden:not(:focus){clip:rect(0, 0, 0, 0);clip-path:inset(50%);height:1px;width:1px;position:absolute}@media(min-width: 320px){.xs\\:visually-hidden:not(:focus){clip:rect(0, 0, 0, 0);clip-path:inset(50%);height:1px;width:1px;position:absolute}}@media(min-width: 640px){.sm\\:visually-hidden:not(:focus){clip:rect(0, 0, 0, 0);clip-path:inset(50%);height:1px;width:1px;position:absolute}}@media(min-width: 960px){.md\\:visually-hidden:not(:focus){clip:rect(0, 0, 0, 0);clip-path:inset(50%);height:1px;width:1px;position:absolute}}@media(min-width: 1312px){.lg\\:visually-hidden:not(:focus){clip:rect(0, 0, 0, 0);clip-path:inset(50%);height:1px;width:1px;position:absolute}}.component-gap-xs{gap:min(var(--tcds-space-layout-xs),1.3888888889%) !important}.component-row-gap-xs{row-gap:min(var(--tcds-space-layout-xs),1.3888888889%) !important}.component-column-gap-xs{column-gap:var(--tcds-space-layout-xs) !important}.component-gap-sm{gap:min(var(--tcds-space-layout-sm),2.0833333333%) !important}.component-row-gap-sm{row-gap:min(var(--tcds-space-layout-sm),2.0833333333%) !important}.component-column-gap-sm{column-gap:var(--tcds-space-layout-sm) !important}.component-gap-md{gap:min(var(--tcds-space-layout-md),4.1666666667%) !important}.component-row-gap-md{row-gap:min(var(--tcds-space-layout-md),4.1666666667%) !important}.component-column-gap-md{column-gap:var(--tcds-space-layout-md) !important}.component-gap-lg{gap:min(var(--tcds-space-layout-lg),5.5555555556%) !important}.component-row-gap-lg{row-gap:min(var(--tcds-space-layout-lg),5.5555555556%) !important}.component-column-gap-lg{column-gap:var(--tcds-space-layout-lg) !important}.component-gap-xl{gap:min(var(--tcds-space-layout-xl),8.3333333333%) !important}.component-row-gap-xl{row-gap:min(var(--tcds-space-layout-xl),8.3333333333%) !important}.component-column-gap-xl{column-gap:var(--tcds-space-layout-xl) !important}.layout-gap-xs{gap:min(var(--tcds-space-layout-xs),1.3888888889%) !important}.layout-row-gap-xs{row-gap:min(var(--tcds-space-layout-xs),1.3888888889%) !important}.layout-column-gap-xs{column-gap:var(--tcds-space-layout-xs) !important}.layout-gap-sm{gap:min(var(--tcds-space-layout-sm),2.0833333333%) !important}.layout-row-gap-sm{row-gap:min(var(--tcds-space-layout-sm),2.0833333333%) !important}.layout-column-gap-sm{column-gap:var(--tcds-space-layout-sm) !important}.layout-gap-md{gap:min(var(--tcds-space-layout-md),4.1666666667%) !important}.layout-row-gap-md{row-gap:min(var(--tcds-space-layout-md),4.1666666667%) !important}.layout-column-gap-md{column-gap:var(--tcds-space-layout-md) !important}.layout-gap-lg{gap:min(var(--tcds-space-layout-lg),5.5555555556%) !important}.layout-row-gap-lg{row-gap:min(var(--tcds-space-layout-lg),5.5555555556%) !important}.layout-column-gap-lg{column-gap:var(--tcds-space-layout-lg) !important}.layout-gap-xl{gap:min(var(--tcds-space-layout-xl),8.3333333333%) !important}.layout-row-gap-xl{row-gap:min(var(--tcds-space-layout-xl),8.3333333333%) !important}.layout-column-gap-xl{column-gap:var(--tcds-space-layout-xl) !important}@media(min-width: 320px){.xs\\:component-gap-xs{gap:min(var(--tcds-space-layout-xs),1.3888888889%) !important}.xs\\:component-row-gap-xs{row-gap:min(var(--tcds-space-layout-xs),1.3888888889%) !important}.xs\\:component-column-gap-xs{column-gap:var(--tcds-space-layout-xs) !important}.xs\\:component-gap-sm{gap:min(var(--tcds-space-layout-sm),2.0833333333%) !important}.xs\\:component-row-gap-sm{row-gap:min(var(--tcds-space-layout-sm),2.0833333333%) !important}.xs\\:component-column-gap-sm{column-gap:var(--tcds-space-layout-sm) !important}.xs\\:component-gap-md{gap:min(var(--tcds-space-layout-md),4.1666666667%) !important}.xs\\:component-row-gap-md{row-gap:min(var(--tcds-space-layout-md),4.1666666667%) !important}.xs\\:component-column-gap-md{column-gap:var(--tcds-space-layout-md) !important}.xs\\:component-gap-lg{gap:min(var(--tcds-space-layout-lg),5.5555555556%) !important}.xs\\:component-row-gap-lg{row-gap:min(var(--tcds-space-layout-lg),5.5555555556%) !important}.xs\\:component-column-gap-lg{column-gap:var(--tcds-space-layout-lg) !important}.xs\\:component-gap-xl{gap:min(var(--tcds-space-layout-xl),8.3333333333%) !important}.xs\\:component-row-gap-xl{row-gap:min(var(--tcds-space-layout-xl),8.3333333333%) !important}.xs\\:component-column-gap-xl{column-gap:var(--tcds-space-layout-xl) !important}.xs\\:layout-gap-xs{gap:min(var(--tcds-space-layout-xs),1.3888888889%) !important}.xs\\:layout-row-gap-xs{row-gap:min(var(--tcds-space-layout-xs),1.3888888889%) !important}.xs\\:layout-column-gap-xs{column-gap:var(--tcds-space-layout-xs) !important}.xs\\:layout-gap-sm{gap:min(var(--tcds-space-layout-sm),2.0833333333%) !important}.xs\\:layout-row-gap-sm{row-gap:min(var(--tcds-space-layout-sm),2.0833333333%) !important}.xs\\:layout-column-gap-sm{column-gap:var(--tcds-space-layout-sm) !important}.xs\\:layout-gap-md{gap:min(var(--tcds-space-layout-md),4.1666666667%) !important}.xs\\:layout-row-gap-md{row-gap:min(var(--tcds-space-layout-md),4.1666666667%) !important}.xs\\:layout-column-gap-md{column-gap:var(--tcds-space-layout-md) !important}.xs\\:layout-gap-lg{gap:min(var(--tcds-space-layout-lg),5.5555555556%) !important}.xs\\:layout-row-gap-lg{row-gap:min(var(--tcds-space-layout-lg),5.5555555556%) !important}.xs\\:layout-column-gap-lg{column-gap:var(--tcds-space-layout-lg) !important}.xs\\:layout-gap-xl{gap:min(var(--tcds-space-layout-xl),8.3333333333%) !important}.xs\\:layout-row-gap-xl{row-gap:min(var(--tcds-space-layout-xl),8.3333333333%) !important}.xs\\:layout-column-gap-xl{column-gap:var(--tcds-space-layout-xl) !important}}@media(min-width: 640px){.sm\\:component-gap-xs{gap:min(var(--tcds-space-layout-xs),1.3888888889%) !important}.sm\\:component-row-gap-xs{row-gap:min(var(--tcds-space-layout-xs),1.3888888889%) !important}.sm\\:component-column-gap-xs{column-gap:var(--tcds-space-layout-xs) !important}.sm\\:component-gap-sm{gap:min(var(--tcds-space-layout-sm),2.0833333333%) !important}.sm\\:component-row-gap-sm{row-gap:min(var(--tcds-space-layout-sm),2.0833333333%) !important}.sm\\:component-column-gap-sm{column-gap:var(--tcds-space-layout-sm) !important}.sm\\:component-gap-md{gap:min(var(--tcds-space-layout-md),4.1666666667%) !important}.sm\\:component-row-gap-md{row-gap:min(var(--tcds-space-layout-md),4.1666666667%) !important}.sm\\:component-column-gap-md{column-gap:var(--tcds-space-layout-md) !important}.sm\\:component-gap-lg{gap:min(var(--tcds-space-layout-lg),5.5555555556%) !important}.sm\\:component-row-gap-lg{row-gap:min(var(--tcds-space-layout-lg),5.5555555556%) !important}.sm\\:component-column-gap-lg{column-gap:var(--tcds-space-layout-lg) !important}.sm\\:component-gap-xl{gap:min(var(--tcds-space-layout-xl),8.3333333333%) !important}.sm\\:component-row-gap-xl{row-gap:min(var(--tcds-space-layout-xl),8.3333333333%) !important}.sm\\:component-column-gap-xl{column-gap:var(--tcds-space-layout-xl) !important}.sm\\:layout-gap-xs{gap:min(var(--tcds-space-layout-xs),1.3888888889%) !important}.sm\\:layout-row-gap-xs{row-gap:min(var(--tcds-space-layout-xs),1.3888888889%) !important}.sm\\:layout-column-gap-xs{column-gap:var(--tcds-space-layout-xs) !important}.sm\\:layout-gap-sm{gap:min(var(--tcds-space-layout-sm),2.0833333333%) !important}.sm\\:layout-row-gap-sm{row-gap:min(var(--tcds-space-layout-sm),2.0833333333%) !important}.sm\\:layout-column-gap-sm{column-gap:var(--tcds-space-layout-sm) !important}.sm\\:layout-gap-md{gap:min(var(--tcds-space-layout-md),4.1666666667%) !important}.sm\\:layout-row-gap-md{row-gap:min(var(--tcds-space-layout-md),4.1666666667%) !important}.sm\\:layout-column-gap-md{column-gap:var(--tcds-space-layout-md) !important}.sm\\:layout-gap-lg{gap:min(var(--tcds-space-layout-lg),5.5555555556%) !important}.sm\\:layout-row-gap-lg{row-gap:min(var(--tcds-space-layout-lg),5.5555555556%) !important}.sm\\:layout-column-gap-lg{column-gap:var(--tcds-space-layout-lg) !important}.sm\\:layout-gap-xl{gap:min(var(--tcds-space-layout-xl),8.3333333333%) !important}.sm\\:layout-row-gap-xl{row-gap:min(var(--tcds-space-layout-xl),8.3333333333%) !important}.sm\\:layout-column-gap-xl{column-gap:var(--tcds-space-layout-xl) !important}}@media(min-width: 960px){.md\\:component-gap-xs{gap:min(var(--tcds-space-layout-xs),1.3888888889%) !important}.md\\:component-row-gap-xs{row-gap:min(var(--tcds-space-layout-xs),1.3888888889%) !important}.md\\:component-column-gap-xs{column-gap:var(--tcds-space-layout-xs) !important}.md\\:component-gap-sm{gap:min(var(--tcds-space-layout-sm),2.0833333333%) !important}.md\\:component-row-gap-sm{row-gap:min(var(--tcds-space-layout-sm),2.0833333333%) !important}.md\\:component-column-gap-sm{column-gap:var(--tcds-space-layout-sm) !important}.md\\:component-gap-md{gap:min(var(--tcds-space-layout-md),4.1666666667%) !important}.md\\:component-row-gap-md{row-gap:min(var(--tcds-space-layout-md),4.1666666667%) !important}.md\\:component-column-gap-md{column-gap:var(--tcds-space-layout-md) !important}.md\\:component-gap-lg{gap:min(var(--tcds-space-layout-lg),5.5555555556%) !important}.md\\:component-row-gap-lg{row-gap:min(var(--tcds-space-layout-lg),5.5555555556%) !important}.md\\:component-column-gap-lg{column-gap:var(--tcds-space-layout-lg) !important}.md\\:component-gap-xl{gap:min(var(--tcds-space-layout-xl),8.3333333333%) !important}.md\\:component-row-gap-xl{row-gap:min(var(--tcds-space-layout-xl),8.3333333333%) !important}.md\\:component-column-gap-xl{column-gap:var(--tcds-space-layout-xl) !important}.md\\:layout-gap-xs{gap:min(var(--tcds-space-layout-xs),1.3888888889%) !important}.md\\:layout-row-gap-xs{row-gap:min(var(--tcds-space-layout-xs),1.3888888889%) !important}.md\\:layout-column-gap-xs{column-gap:var(--tcds-space-layout-xs) !important}.md\\:layout-gap-sm{gap:min(var(--tcds-space-layout-sm),2.0833333333%) !important}.md\\:layout-row-gap-sm{row-gap:min(var(--tcds-space-layout-sm),2.0833333333%) !important}.md\\:layout-column-gap-sm{column-gap:var(--tcds-space-layout-sm) !important}.md\\:layout-gap-md{gap:min(var(--tcds-space-layout-md),4.1666666667%) !important}.md\\:layout-row-gap-md{row-gap:min(var(--tcds-space-layout-md),4.1666666667%) !important}.md\\:layout-column-gap-md{column-gap:var(--tcds-space-layout-md) !important}.md\\:layout-gap-lg{gap:min(var(--tcds-space-layout-lg),5.5555555556%) !important}.md\\:layout-row-gap-lg{row-gap:min(var(--tcds-space-layout-lg),5.5555555556%) !important}.md\\:layout-column-gap-lg{column-gap:var(--tcds-space-layout-lg) !important}.md\\:layout-gap-xl{gap:min(var(--tcds-space-layout-xl),8.3333333333%) !important}.md\\:layout-row-gap-xl{row-gap:min(var(--tcds-space-layout-xl),8.3333333333%) !important}.md\\:layout-column-gap-xl{column-gap:var(--tcds-space-layout-xl) !important}}@media(min-width: 1312px){.lg\\:component-gap-xs{gap:min(var(--tcds-space-layout-xs),1.3888888889%) !important}.lg\\:component-row-gap-xs{row-gap:min(var(--tcds-space-layout-xs),1.3888888889%) !important}.lg\\:component-column-gap-xs{column-gap:var(--tcds-space-layout-xs) !important}.lg\\:component-gap-sm{gap:min(var(--tcds-space-layout-sm),2.0833333333%) !important}.lg\\:component-row-gap-sm{row-gap:min(var(--tcds-space-layout-sm),2.0833333333%) !important}.lg\\:component-column-gap-sm{column-gap:var(--tcds-space-layout-sm) !important}.lg\\:component-gap-md{gap:min(var(--tcds-space-layout-md),4.1666666667%) !important}.lg\\:component-row-gap-md{row-gap:min(var(--tcds-space-layout-md),4.1666666667%) !important}.lg\\:component-column-gap-md{column-gap:var(--tcds-space-layout-md) !important}.lg\\:component-gap-lg{gap:min(var(--tcds-space-layout-lg),5.5555555556%) !important}.lg\\:component-row-gap-lg{row-gap:min(var(--tcds-space-layout-lg),5.5555555556%) !important}.lg\\:component-column-gap-lg{column-gap:var(--tcds-space-layout-lg) !important}.lg\\:component-gap-xl{gap:min(var(--tcds-space-layout-xl),8.3333333333%) !important}.lg\\:component-row-gap-xl{row-gap:min(var(--tcds-space-layout-xl),8.3333333333%) !important}.lg\\:component-column-gap-xl{column-gap:var(--tcds-space-layout-xl) !important}.lg\\:layout-gap-xs{gap:min(var(--tcds-space-layout-xs),1.3888888889%) !important}.lg\\:layout-row-gap-xs{row-gap:min(var(--tcds-space-layout-xs),1.3888888889%) !important}.lg\\:layout-column-gap-xs{column-gap:var(--tcds-space-layout-xs) !important}.lg\\:layout-gap-sm{gap:min(var(--tcds-space-layout-sm),2.0833333333%) !important}.lg\\:layout-row-gap-sm{row-gap:min(var(--tcds-space-layout-sm),2.0833333333%) !important}.lg\\:layout-column-gap-sm{column-gap:var(--tcds-space-layout-sm) !important}.lg\\:layout-gap-md{gap:min(var(--tcds-space-layout-md),4.1666666667%) !important}.lg\\:layout-row-gap-md{row-gap:min(var(--tcds-space-layout-md),4.1666666667%) !important}.lg\\:layout-column-gap-md{column-gap:var(--tcds-space-layout-md) !important}.lg\\:layout-gap-lg{gap:min(var(--tcds-space-layout-lg),5.5555555556%) !important}.lg\\:layout-row-gap-lg{row-gap:min(var(--tcds-space-layout-lg),5.5555555556%) !important}.lg\\:layout-column-gap-lg{column-gap:var(--tcds-space-layout-lg) !important}.lg\\:layout-gap-xl{gap:min(var(--tcds-space-layout-xl),8.3333333333%) !important}.lg\\:layout-row-gap-xl{row-gap:min(var(--tcds-space-layout-xl),8.3333333333%) !important}.lg\\:layout-column-gap-xl{column-gap:var(--tcds-space-layout-xl) !important}}.component-padding-block-xs{--padding-block-start: var(--tcds-space-layout-xs);--padding-block-end: var(--tcds-space-layout-xs);--padding-block: var(--padding-block-start) var(--padding-block-end);padding-block-start:var(--padding-block-start) !important;padding-block-end:var(--padding-block-end) !important}.component-padding-block-start-xs{--padding-block-start: var(--tcds-space-layout-xs);padding-block-start:var(--padding-block-start) !important}.component-padding-block-end-xs{--padding-block-end: var(--tcds-space-layout-xs);padding-block-end:var(--padding-block-end) !important}.component-margin-block-xs{--margin-block-start: var(--tcds-space-layout-xs);--margin-block-end: var(--tcds-space-layout-xs);--margin-block: var(--margin-block-start) var(--margin-block-end);margin-block-start:var(--margin-block-start) !important;margin-block-end:var(--margin-block-end) !important}.component-margin-block-start-xs{--margin-block-start: var(--tcds-space-layout-xs);margin-block-start:var(--margin-block-start) !important}.component-margin-block-end-xs{--margin-block-end: var(--tcds-space-layout-xs);margin-block-end:var(--margin-block-end) !important}.component-padding-block-sm{--padding-block-start: var(--tcds-space-layout-sm);--padding-block-end: var(--tcds-space-layout-sm);--padding-block: var(--padding-block-start) var(--padding-block-end);padding-block-start:var(--padding-block-start) !important;padding-block-end:var(--padding-block-end) !important}.component-padding-block-start-sm{--padding-block-start: var(--tcds-space-layout-sm);padding-block-start:var(--padding-block-start) !important}.component-padding-block-end-sm{--padding-block-end: var(--tcds-space-layout-sm);padding-block-end:var(--padding-block-end) !important}.component-margin-block-sm{--margin-block-start: var(--tcds-space-layout-sm);--margin-block-end: var(--tcds-space-layout-sm);--margin-block: var(--margin-block-start) var(--margin-block-end);margin-block-start:var(--margin-block-start) !important;margin-block-end:var(--margin-block-end) !important}.component-margin-block-start-sm{--margin-block-start: var(--tcds-space-layout-sm);margin-block-start:var(--margin-block-start) !important}.component-margin-block-end-sm{--margin-block-end: var(--tcds-space-layout-sm);margin-block-end:var(--margin-block-end) !important}.component-padding-block-md{--padding-block-start: var(--tcds-space-layout-md);--padding-block-end: var(--tcds-space-layout-md);--padding-block: var(--padding-block-start) var(--padding-block-end);padding-block-start:var(--padding-block-start) !important;padding-block-end:var(--padding-block-end) !important}.component-padding-block-start-md{--padding-block-start: var(--tcds-space-layout-md);padding-block-start:var(--padding-block-start) !important}.component-padding-block-end-md{--padding-block-end: var(--tcds-space-layout-md);padding-block-end:var(--padding-block-end) !important}.component-margin-block-md{--margin-block-start: var(--tcds-space-layout-md);--margin-block-end: var(--tcds-space-layout-md);--margin-block: var(--margin-block-start) var(--margin-block-end);margin-block-start:var(--margin-block-start) !important;margin-block-end:var(--margin-block-end) !important}.component-margin-block-start-md{--margin-block-start: var(--tcds-space-layout-md);margin-block-start:var(--margin-block-start) !important}.component-margin-block-end-md{--margin-block-end: var(--tcds-space-layout-md);margin-block-end:var(--margin-block-end) !important}.component-padding-block-lg{--padding-block-start: var(--tcds-space-layout-lg);--padding-block-end: var(--tcds-space-layout-lg);--padding-block: var(--padding-block-start) var(--padding-block-end);padding-block-start:var(--padding-block-start) !important;padding-block-end:var(--padding-block-end) !important}.component-padding-block-start-lg{--padding-block-start: var(--tcds-space-layout-lg);padding-block-start:var(--padding-block-start) !important}.component-padding-block-end-lg{--padding-block-end: var(--tcds-space-layout-lg);padding-block-end:var(--padding-block-end) !important}.component-margin-block-lg{--margin-block-start: var(--tcds-space-layout-lg);--margin-block-end: var(--tcds-space-layout-lg);--margin-block: var(--margin-block-start) var(--margin-block-end);margin-block-start:var(--margin-block-start) !important;margin-block-end:var(--margin-block-end) !important}.component-margin-block-start-lg{--margin-block-start: var(--tcds-space-layout-lg);margin-block-start:var(--margin-block-start) !important}.component-margin-block-end-lg{--margin-block-end: var(--tcds-space-layout-lg);margin-block-end:var(--margin-block-end) !important}.component-padding-block-xl{--padding-block-start: var(--tcds-space-layout-xl);--padding-block-end: var(--tcds-space-layout-xl);--padding-block: var(--padding-block-start) var(--padding-block-end);padding-block-start:var(--padding-block-start) !important;padding-block-end:var(--padding-block-end) !important}.component-padding-block-start-xl{--padding-block-start: var(--tcds-space-layout-xl);padding-block-start:var(--padding-block-start) !important}.component-padding-block-end-xl{--padding-block-end: var(--tcds-space-layout-xl);padding-block-end:var(--padding-block-end) !important}.component-margin-block-xl{--margin-block-start: var(--tcds-space-layout-xl);--margin-block-end: var(--tcds-space-layout-xl);--margin-block: var(--margin-block-start) var(--margin-block-end);margin-block-start:var(--margin-block-start) !important;margin-block-end:var(--margin-block-end) !important}.component-margin-block-start-xl{--margin-block-start: var(--tcds-space-layout-xl);margin-block-start:var(--margin-block-start) !important}.component-margin-block-end-xl{--margin-block-end: var(--tcds-space-layout-xl);margin-block-end:var(--margin-block-end) !important}.layout-padding-block-xs{--padding-block-start: var(--tcds-space-layout-xs);--padding-block-end: var(--tcds-space-layout-xs);--padding-block: var(--padding-block-start) var(--padding-block-end);padding-block-start:var(--padding-block-start) !important;padding-block-end:var(--padding-block-end) !important}.layout-padding-block-start-xs{--padding-block-start: var(--tcds-space-layout-xs);padding-block-start:var(--padding-block-start) !important}.layout-padding-block-end-xs{--padding-block-end: var(--tcds-space-layout-xs);padding-block-end:var(--padding-block-end) !important}.layout-margin-block-xs{--margin-block-start: var(--tcds-space-layout-xs);--margin-block-end: var(--tcds-space-layout-xs);--margin-block: var(--margin-block-start) var(--margin-block-end);margin-block-start:var(--margin-block-start) !important;margin-block-end:var(--margin-block-end) !important}.layout-margin-block-start-xs{--margin-block-start: var(--tcds-space-layout-xs);margin-block-start:var(--margin-block-start) !important}.layout-margin-block-end-xs{--margin-block-end: var(--tcds-space-layout-xs);margin-block-end:var(--margin-block-end) !important}.layout-padding-block-sm{--padding-block-start: var(--tcds-space-layout-sm);--padding-block-end: var(--tcds-space-layout-sm);--padding-block: var(--padding-block-start) var(--padding-block-end);padding-block-start:var(--padding-block-start) !important;padding-block-end:var(--padding-block-end) !important}.layout-padding-block-start-sm{--padding-block-start: var(--tcds-space-layout-sm);padding-block-start:var(--padding-block-start) !important}.layout-padding-block-end-sm{--padding-block-end: var(--tcds-space-layout-sm);padding-block-end:var(--padding-block-end) !important}.layout-margin-block-sm{--margin-block-start: var(--tcds-space-layout-sm);--margin-block-end: var(--tcds-space-layout-sm);--margin-block: var(--margin-block-start) var(--margin-block-end);margin-block-start:var(--margin-block-start) !important;margin-block-end:var(--margin-block-end) !important}.layout-margin-block-start-sm{--margin-block-start: var(--tcds-space-layout-sm);margin-block-start:var(--margin-block-start) !important}.layout-margin-block-end-sm{--margin-block-end: var(--tcds-space-layout-sm);margin-block-end:var(--margin-block-end) !important}.layout-padding-block-md{--padding-block-start: var(--tcds-space-layout-md);--padding-block-end: var(--tcds-space-layout-md);--padding-block: var(--padding-block-start) var(--padding-block-end);padding-block-start:var(--padding-block-start) !important;padding-block-end:var(--padding-block-end) !important}.layout-padding-block-start-md{--padding-block-start: var(--tcds-space-layout-md);padding-block-start:var(--padding-block-start) !important}.layout-padding-block-end-md{--padding-block-end: var(--tcds-space-layout-md);padding-block-end:var(--padding-block-end) !important}.layout-margin-block-md{--margin-block-start: var(--tcds-space-layout-md);--margin-block-end: var(--tcds-space-layout-md);--margin-block: var(--margin-block-start) var(--margin-block-end);margin-block-start:var(--margin-block-start) !important;margin-block-end:var(--margin-block-end) !important}.layout-margin-block-start-md{--margin-block-start: var(--tcds-space-layout-md);margin-block-start:var(--margin-block-start) !important}.layout-margin-block-end-md{--margin-block-end: var(--tcds-space-layout-md);margin-block-end:var(--margin-block-end) !important}.layout-padding-block-lg{--padding-block-start: var(--tcds-space-layout-lg);--padding-block-end: var(--tcds-space-layout-lg);--padding-block: var(--padding-block-start) var(--padding-block-end);padding-block-start:var(--padding-block-start) !important;padding-block-end:var(--padding-block-end) !important}.layout-padding-block-start-lg{--padding-block-start: var(--tcds-space-layout-lg);padding-block-start:var(--padding-block-start) !important}.layout-padding-block-end-lg{--padding-block-end: var(--tcds-space-layout-lg);padding-block-end:var(--padding-block-end) !important}.layout-margin-block-lg{--margin-block-start: var(--tcds-space-layout-lg);--margin-block-end: var(--tcds-space-layout-lg);--margin-block: var(--margin-block-start) var(--margin-block-end);margin-block-start:var(--margin-block-start) !important;margin-block-end:var(--margin-block-end) !important}.layout-margin-block-start-lg{--margin-block-start: var(--tcds-space-layout-lg);margin-block-start:var(--margin-block-start) !important}.layout-margin-block-end-lg{--margin-block-end: var(--tcds-space-layout-lg);margin-block-end:var(--margin-block-end) !important}.layout-padding-block-xl{--padding-block-start: var(--tcds-space-layout-xl);--padding-block-end: var(--tcds-space-layout-xl);--padding-block: var(--padding-block-start) var(--padding-block-end);padding-block-start:var(--padding-block-start) !important;padding-block-end:var(--padding-block-end) !important}.layout-padding-block-start-xl{--padding-block-start: var(--tcds-space-layout-xl);padding-block-start:var(--padding-block-start) !important}.layout-padding-block-end-xl{--padding-block-end: var(--tcds-space-layout-xl);padding-block-end:var(--padding-block-end) !important}.layout-margin-block-xl{--margin-block-start: var(--tcds-space-layout-xl);--margin-block-end: var(--tcds-space-layout-xl);--margin-block: var(--margin-block-start) var(--margin-block-end);margin-block-start:var(--margin-block-start) !important;margin-block-end:var(--margin-block-end) !important}.layout-margin-block-start-xl{--margin-block-start: var(--tcds-space-layout-xl);margin-block-start:var(--margin-block-start) !important}.layout-margin-block-end-xl{--margin-block-end: var(--tcds-space-layout-xl);margin-block-end:var(--margin-block-end) !important}@media(min-width: 320px){.xs\\:component-padding-block-xs{--padding-block-start: var(--tcds-space-layout-xs);--padding-block-end: var(--tcds-space-layout-xs);--padding-block: var(--padding-block-start) var(--padding-block-end);padding-block-start:var(--padding-block-start) !important;padding-block-end:var(--padding-block-end) !important}.xs\\:component-padding-block-start-xs{--padding-block-start: var(--tcds-space-layout-xs);padding-block-start:var(--padding-block-start) !important}.xs\\:component-padding-block-end-xs{--padding-block-end: var(--tcds-space-layout-xs);padding-block-end:var(--padding-block-end) !important}.xs\\:component-margin-block-xs{--margin-block-start: var(--tcds-space-layout-xs);--margin-block-end: var(--tcds-space-layout-xs);--margin-block: var(--margin-block-start) var(--margin-block-end);margin-block-start:var(--margin-block-start) !important;margin-block-end:var(--margin-block-end) !important}.xs\\:component-margin-block-start-xs{--margin-block-start: var(--tcds-space-layout-xs);margin-block-start:var(--margin-block-start) !important}.xs\\:component-margin-block-end-xs{--margin-block-end: var(--tcds-space-layout-xs);margin-block-end:var(--margin-block-end) !important}.xs\\:component-padding-block-sm{--padding-block-start: var(--tcds-space-layout-sm);--padding-block-end: var(--tcds-space-layout-sm);--padding-block: var(--padding-block-start) var(--padding-block-end);padding-block-start:var(--padding-block-start) !important;padding-block-end:var(--padding-block-end) !important}.xs\\:component-padding-block-start-sm{--padding-block-start: var(--tcds-space-layout-sm);padding-block-start:var(--padding-block-start) !important}.xs\\:component-padding-block-end-sm{--padding-block-end: var(--tcds-space-layout-sm);padding-block-end:var(--padding-block-end) !important}.xs\\:component-margin-block-sm{--margin-block-start: var(--tcds-space-layout-sm);--margin-block-end: var(--tcds-space-layout-sm);--margin-block: var(--margin-block-start) var(--margin-block-end);margin-block-start:var(--margin-block-start) !important;margin-block-end:var(--margin-block-end) !important}.xs\\:component-margin-block-start-sm{--margin-block-start: var(--tcds-space-layout-sm);margin-block-start:var(--margin-block-start) !important}.xs\\:component-margin-block-end-sm{--margin-block-end: var(--tcds-space-layout-sm);margin-block-end:var(--margin-block-end) !important}.xs\\:component-padding-block-md{--padding-block-start: var(--tcds-space-layout-md);--padding-block-end: var(--tcds-space-layout-md);--padding-block: var(--padding-block-start) var(--padding-block-end);padding-block-start:var(--padding-block-start) !important;padding-block-end:var(--padding-block-end) !important}.xs\\:component-padding-block-start-md{--padding-block-start: var(--tcds-space-layout-md);padding-block-start:var(--padding-block-start) !important}.xs\\:component-padding-block-end-md{--padding-block-end: var(--tcds-space-layout-md);padding-block-end:var(--padding-block-end) !important}.xs\\:component-margin-block-md{--margin-block-start: var(--tcds-space-layout-md);--margin-block-end: var(--tcds-space-layout-md);--margin-block: var(--margin-block-start) var(--margin-block-end);margin-block-start:var(--margin-block-start) !important;margin-block-end:var(--margin-block-end) !important}.xs\\:component-margin-block-start-md{--margin-block-start: var(--tcds-space-layout-md);margin-block-start:var(--margin-block-start) !important}.xs\\:component-margin-block-end-md{--margin-block-end: var(--tcds-space-layout-md);margin-block-end:var(--margin-block-end) !important}.xs\\:component-padding-block-lg{--padding-block-start: var(--tcds-space-layout-lg);--padding-block-end: var(--tcds-space-layout-lg);--padding-block: var(--padding-block-start) var(--padding-block-end);padding-block-start:var(--padding-block-start) !important;padding-block-end:var(--padding-block-end) !important}.xs\\:component-padding-block-start-lg{--padding-block-start: var(--tcds-space-layout-lg);padding-block-start:var(--padding-block-start) !important}.xs\\:component-padding-block-end-lg{--padding-block-end: var(--tcds-space-layout-lg);padding-block-end:var(--padding-block-end) !important}.xs\\:component-margin-block-lg{--margin-block-start: var(--tcds-space-layout-lg);--margin-block-end: var(--tcds-space-layout-lg);--margin-block: var(--margin-block-start) var(--margin-block-end);margin-block-start:var(--margin-block-start) !important;margin-block-end:var(--margin-block-end) !important}.xs\\:component-margin-block-start-lg{--margin-block-start: var(--tcds-space-layout-lg);margin-block-start:var(--margin-block-start) !important}.xs\\:component-margin-block-end-lg{--margin-block-end: var(--tcds-space-layout-lg);margin-block-end:var(--margin-block-end) !important}.xs\\:component-padding-block-xl{--padding-block-start: var(--tcds-space-layout-xl);--padding-block-end: var(--tcds-space-layout-xl);--padding-block: var(--padding-block-start) var(--padding-block-end);padding-block-start:var(--padding-block-start) !important;padding-block-end:var(--padding-block-end) !important}.xs\\:component-padding-block-start-xl{--padding-block-start: var(--tcds-space-layout-xl);padding-block-start:var(--padding-block-start) !important}.xs\\:component-padding-block-end-xl{--padding-block-end: var(--tcds-space-layout-xl);padding-block-end:var(--padding-block-end) !important}.xs\\:component-margin-block-xl{--margin-block-start: var(--tcds-space-layout-xl);--margin-block-end: var(--tcds-space-layout-xl);--margin-block: var(--margin-block-start) var(--margin-block-end);margin-block-start:var(--margin-block-start) !important;margin-block-end:var(--margin-block-end) !important}.xs\\:component-margin-block-start-xl{--margin-block-start: var(--tcds-space-layout-xl);margin-block-start:var(--margin-block-start) !important}.xs\\:component-margin-block-end-xl{--margin-block-end: var(--tcds-space-layout-xl);margin-block-end:var(--margin-block-end) !important}.xs\\:layout-padding-block-xs{--padding-block-start: var(--tcds-space-layout-xs);--padding-block-end: var(--tcds-space-layout-xs);--padding-block: var(--padding-block-start) var(--padding-block-end);padding-block-start:var(--padding-block-start) !important;padding-block-end:var(--padding-block-end) !important}.xs\\:layout-padding-block-start-xs{--padding-block-start: var(--tcds-space-layout-xs);padding-block-start:var(--padding-block-start) !important}.xs\\:layout-padding-block-end-xs{--padding-block-end: var(--tcds-space-layout-xs);padding-block-end:var(--padding-block-end) !important}.xs\\:layout-margin-block-xs{--margin-block-start: var(--tcds-space-layout-xs);--margin-block-end: var(--tcds-space-layout-xs);--margin-block: var(--margin-block-start) var(--margin-block-end);margin-block-start:var(--margin-block-start) !important;margin-block-end:var(--margin-block-end) !important}.xs\\:layout-margin-block-start-xs{--margin-block-start: var(--tcds-space-layout-xs);margin-block-start:var(--margin-block-start) !important}.xs\\:layout-margin-block-end-xs{--margin-block-end: var(--tcds-space-layout-xs);margin-block-end:var(--margin-block-end) !important}.xs\\:layout-padding-block-sm{--padding-block-start: var(--tcds-space-layout-sm);--padding-block-end: var(--tcds-space-layout-sm);--padding-block: var(--padding-block-start) var(--padding-block-end);padding-block-start:var(--padding-block-start) !important;padding-block-end:var(--padding-block-end) !important}.xs\\:layout-padding-block-start-sm{--padding-block-start: var(--tcds-space-layout-sm);padding-block-start:var(--padding-block-start) !important}.xs\\:layout-padding-block-end-sm{--padding-block-end: var(--tcds-space-layout-sm);padding-block-end:var(--padding-block-end) !important}.xs\\:layout-margin-block-sm{--margin-block-start: var(--tcds-space-layout-sm);--margin-block-end: var(--tcds-space-layout-sm);--margin-block: var(--margin-block-start) var(--margin-block-end);margin-block-start:var(--margin-block-start) !important;margin-block-end:var(--margin-block-end) !important}.xs\\:layout-margin-block-start-sm{--margin-block-start: var(--tcds-space-layout-sm);margin-block-start:var(--margin-block-start) !important}.xs\\:layout-margin-block-end-sm{--margin-block-end: var(--tcds-space-layout-sm);margin-block-end:var(--margin-block-end) !important}.xs\\:layout-padding-block-md{--padding-block-start: var(--tcds-space-layout-md);--padding-block-end: var(--tcds-space-layout-md);--padding-block: var(--padding-block-start) var(--padding-block-end);padding-block-start:var(--padding-block-start) !important;padding-block-end:var(--padding-block-end) !important}.xs\\:layout-padding-block-start-md{--padding-block-start: var(--tcds-space-layout-md);padding-block-start:var(--padding-block-start) !important}.xs\\:layout-padding-block-end-md{--padding-block-end: var(--tcds-space-layout-md);padding-block-end:var(--padding-block-end) !important}.xs\\:layout-margin-block-md{--margin-block-start: var(--tcds-space-layout-md);--margin-block-end: var(--tcds-space-layout-md);--margin-block: var(--margin-block-start) var(--margin-block-end);margin-block-start:var(--margin-block-start) !important;margin-block-end:var(--margin-block-end) !important}.xs\\:layout-margin-block-start-md{--margin-block-start: var(--tcds-space-layout-md);margin-block-start:var(--margin-block-start) !important}.xs\\:layout-margin-block-end-md{--margin-block-end: var(--tcds-space-layout-md);margin-block-end:var(--margin-block-end) !important}.xs\\:layout-padding-block-lg{--padding-block-start: var(--tcds-space-layout-lg);--padding-block-end: var(--tcds-space-layout-lg);--padding-block: var(--padding-block-start) var(--padding-block-end);padding-block-start:var(--padding-block-start) !important;padding-block-end:var(--padding-block-end) !important}.xs\\:layout-padding-block-start-lg{--padding-block-start: var(--tcds-space-layout-lg);padding-block-start:var(--padding-block-start) !important}.xs\\:layout-padding-block-end-lg{--padding-block-end: var(--tcds-space-layout-lg);padding-block-end:var(--padding-block-end) !important}.xs\\:layout-margin-block-lg{--margin-block-start: var(--tcds-space-layout-lg);--margin-block-end: var(--tcds-space-layout-lg);--margin-block: var(--margin-block-start) var(--margin-block-end);margin-block-start:var(--margin-block-start) !important;margin-block-end:var(--margin-block-end) !important}.xs\\:layout-margin-block-start-lg{--margin-block-start: var(--tcds-space-layout-lg);margin-block-start:var(--margin-block-start) !important}.xs\\:layout-margin-block-end-lg{--margin-block-end: var(--tcds-space-layout-lg);margin-block-end:var(--margin-block-end) !important}.xs\\:layout-padding-block-xl{--padding-block-start: var(--tcds-space-layout-xl);--padding-block-end: var(--tcds-space-layout-xl);--padding-block: var(--padding-block-start) var(--padding-block-end);padding-block-start:var(--padding-block-start) !important;padding-block-end:var(--padding-block-end) !important}.xs\\:layout-padding-block-start-xl{--padding-block-start: var(--tcds-space-layout-xl);padding-block-start:var(--padding-block-start) !important}.xs\\:layout-padding-block-end-xl{--padding-block-end: var(--tcds-space-layout-xl);padding-block-end:var(--padding-block-end) !important}.xs\\:layout-margin-block-xl{--margin-block-start: var(--tcds-space-layout-xl);--margin-block-end: var(--tcds-space-layout-xl);--margin-block: var(--margin-block-start) var(--margin-block-end);margin-block-start:var(--margin-block-start) !important;margin-block-end:var(--margin-block-end) !important}.xs\\:layout-margin-block-start-xl{--margin-block-start: var(--tcds-space-layout-xl);margin-block-start:var(--margin-block-start) !important}.xs\\:layout-margin-block-end-xl{--margin-block-end: var(--tcds-space-layout-xl);margin-block-end:var(--margin-block-end) !important}}@media(min-width: 640px){.sm\\:component-padding-block-xs{--padding-block-start: var(--tcds-space-layout-xs);--padding-block-end: var(--tcds-space-layout-xs);--padding-block: var(--padding-block-start) var(--padding-block-end);padding-block-start:var(--padding-block-start) !important;padding-block-end:var(--padding-block-end) !important}.sm\\:component-padding-block-start-xs{--padding-block-start: var(--tcds-space-layout-xs);padding-block-start:var(--padding-block-start) !important}.sm\\:component-padding-block-end-xs{--padding-block-end: var(--tcds-space-layout-xs);padding-block-end:var(--padding-block-end) !important}.sm\\:component-margin-block-xs{--margin-block-start: var(--tcds-space-layout-xs);--margin-block-end: var(--tcds-space-layout-xs);--margin-block: var(--margin-block-start) var(--margin-block-end);margin-block-start:var(--margin-block-start) !important;margin-block-end:var(--margin-block-end) !important}.sm\\:component-margin-block-start-xs{--margin-block-start: var(--tcds-space-layout-xs);margin-block-start:var(--margin-block-start) !important}.sm\\:component-margin-block-end-xs{--margin-block-end: var(--tcds-space-layout-xs);margin-block-end:var(--margin-block-end) !important}.sm\\:component-padding-block-sm{--padding-block-start: var(--tcds-space-layout-sm);--padding-block-end: var(--tcds-space-layout-sm);--padding-block: var(--padding-block-start) var(--padding-block-end);padding-block-start:var(--padding-block-start) !important;padding-block-end:var(--padding-block-end) !important}.sm\\:component-padding-block-start-sm{--padding-block-start: var(--tcds-space-layout-sm);padding-block-start:var(--padding-block-start) !important}.sm\\:component-padding-block-end-sm{--padding-block-end: var(--tcds-space-layout-sm);padding-block-end:var(--padding-block-end) !important}.sm\\:component-margin-block-sm{--margin-block-start: var(--tcds-space-layout-sm);--margin-block-end: var(--tcds-space-layout-sm);--margin-block: var(--margin-block-start) var(--margin-block-end);margin-block-start:var(--margin-block-start) !important;margin-block-end:var(--margin-block-end) !important}.sm\\:component-margin-block-start-sm{--margin-block-start: var(--tcds-space-layout-sm);margin-block-start:var(--margin-block-start) !important}.sm\\:component-margin-block-end-sm{--margin-block-end: var(--tcds-space-layout-sm);margin-block-end:var(--margin-block-end) !important}.sm\\:component-padding-block-md{--padding-block-start: var(--tcds-space-layout-md);--padding-block-end: var(--tcds-space-layout-md);--padding-block: var(--padding-block-start) var(--padding-block-end);padding-block-start:var(--padding-block-start) !important;padding-block-end:var(--padding-block-end) !important}.sm\\:component-padding-block-start-md{--padding-block-start: var(--tcds-space-layout-md);padding-block-start:var(--padding-block-start) !important}.sm\\:component-padding-block-end-md{--padding-block-end: var(--tcds-space-layout-md);padding-block-end:var(--padding-block-end) !important}.sm\\:component-margin-block-md{--margin-block-start: var(--tcds-space-layout-md);--margin-block-end: var(--tcds-space-layout-md);--margin-block: var(--margin-block-start) var(--margin-block-end);margin-block-start:var(--margin-block-start) !important;margin-block-end:var(--margin-block-end) !important}.sm\\:component-margin-block-start-md{--margin-block-start: var(--tcds-space-layout-md);margin-block-start:var(--margin-block-start) !important}.sm\\:component-margin-block-end-md{--margin-block-end: var(--tcds-space-layout-md);margin-block-end:var(--margin-block-end) !important}.sm\\:component-padding-block-lg{--padding-block-start: var(--tcds-space-layout-lg);--padding-block-end: var(--tcds-space-layout-lg);--padding-block: var(--padding-block-start) var(--padding-block-end);padding-block-start:var(--padding-block-start) !important;padding-block-end:var(--padding-block-end) !important}.sm\\:component-padding-block-start-lg{--padding-block-start: var(--tcds-space-layout-lg);padding-block-start:var(--padding-block-start) !important}.sm\\:component-padding-block-end-lg{--padding-block-end: var(--tcds-space-layout-lg);padding-block-end:var(--padding-block-end) !important}.sm\\:component-margin-block-lg{--margin-block-start: var(--tcds-space-layout-lg);--margin-block-end: var(--tcds-space-layout-lg);--margin-block: var(--margin-block-start) var(--margin-block-end);margin-block-start:var(--margin-block-start) !important;margin-block-end:var(--margin-block-end) !important}.sm\\:component-margin-block-start-lg{--margin-block-start: var(--tcds-space-layout-lg);margin-block-start:var(--margin-block-start) !important}.sm\\:component-margin-block-end-lg{--margin-block-end: var(--tcds-space-layout-lg);margin-block-end:var(--margin-block-end) !important}.sm\\:component-padding-block-xl{--padding-block-start: var(--tcds-space-layout-xl);--padding-block-end: var(--tcds-space-layout-xl);--padding-block: var(--padding-block-start) var(--padding-block-end);padding-block-start:var(--padding-block-start) !important;padding-block-end:var(--padding-block-end) !important}.sm\\:component-padding-block-start-xl{--padding-block-start: var(--tcds-space-layout-xl);padding-block-start:var(--padding-block-start) !important}.sm\\:component-padding-block-end-xl{--padding-block-end: var(--tcds-space-layout-xl);padding-block-end:var(--padding-block-end) !important}.sm\\:component-margin-block-xl{--margin-block-start: var(--tcds-space-layout-xl);--margin-block-end: var(--tcds-space-layout-xl);--margin-block: var(--margin-block-start) var(--margin-block-end);margin-block-start:var(--margin-block-start) !important;margin-block-end:var(--margin-block-end) !important}.sm\\:component-margin-block-start-xl{--margin-block-start: var(--tcds-space-layout-xl);margin-block-start:var(--margin-block-start) !important}.sm\\:component-margin-block-end-xl{--margin-block-end: var(--tcds-space-layout-xl);margin-block-end:var(--margin-block-end) !important}.sm\\:layout-padding-block-xs{--padding-block-start: var(--tcds-space-layout-xs);--padding-block-end: var(--tcds-space-layout-xs);--padding-block: var(--padding-block-start) var(--padding-block-end);padding-block-start:var(--padding-block-start) !important;padding-block-end:var(--padding-block-end) !important}.sm\\:layout-padding-block-start-xs{--padding-block-start: var(--tcds-space-layout-xs);padding-block-start:var(--padding-block-start) !important}.sm\\:layout-padding-block-end-xs{--padding-block-end: var(--tcds-space-layout-xs);padding-block-end:var(--padding-block-end) !important}.sm\\:layout-margin-block-xs{--margin-block-start: var(--tcds-space-layout-xs);--margin-block-end: var(--tcds-space-layout-xs);--margin-block: var(--margin-block-start) var(--margin-block-end);margin-block-start:var(--margin-block-start) !important;margin-block-end:var(--margin-block-end) !important}.sm\\:layout-margin-block-start-xs{--margin-block-start: var(--tcds-space-layout-xs);margin-block-start:var(--margin-block-start) !important}.sm\\:layout-margin-block-end-xs{--margin-block-end: var(--tcds-space-layout-xs);margin-block-end:var(--margin-block-end) !important}.sm\\:layout-padding-block-sm{--padding-block-start: var(--tcds-space-layout-sm);--padding-block-end: var(--tcds-space-layout-sm);--padding-block: var(--padding-block-start) var(--padding-block-end);padding-block-start:var(--padding-block-start) !important;padding-block-end:var(--padding-block-end) !important}.sm\\:layout-padding-block-start-sm{--padding-block-start: var(--tcds-space-layout-sm);padding-block-start:var(--padding-block-start) !important}.sm\\:layout-padding-block-end-sm{--padding-block-end: var(--tcds-space-layout-sm);padding-block-end:var(--padding-block-end) !important}.sm\\:layout-margin-block-sm{--margin-block-start: var(--tcds-space-layout-sm);--margin-block-end: var(--tcds-space-layout-sm);--margin-block: var(--margin-block-start) var(--margin-block-end);margin-block-start:var(--margin-block-start) !important;margin-block-end:var(--margin-block-end) !important}.sm\\:layout-margin-block-start-sm{--margin-block-start: var(--tcds-space-layout-sm);margin-block-start:var(--margin-block-start) !important}.sm\\:layout-margin-block-end-sm{--margin-block-end: var(--tcds-space-layout-sm);margin-block-end:var(--margin-block-end) !important}.sm\\:layout-padding-block-md{--padding-block-start: var(--tcds-space-layout-md);--padding-block-end: var(--tcds-space-layout-md);--padding-block: var(--padding-block-start) var(--padding-block-end);padding-block-start:var(--padding-block-start) !important;padding-block-end:var(--padding-block-end) !important}.sm\\:layout-padding-block-start-md{--padding-block-start: var(--tcds-space-layout-md);padding-block-start:var(--padding-block-start) !important}.sm\\:layout-padding-block-end-md{--padding-block-end: var(--tcds-space-layout-md);padding-block-end:var(--padding-block-end) !important}.sm\\:layout-margin-block-md{--margin-block-start: var(--tcds-space-layout-md);--margin-block-end: var(--tcds-space-layout-md);--margin-block: var(--margin-block-start) var(--margin-block-end);margin-block-start:var(--margin-block-start) !important;margin-block-end:var(--margin-block-end) !important}.sm\\:layout-margin-block-start-md{--margin-block-start: var(--tcds-space-layout-md);margin-block-start:var(--margin-block-start) !important}.sm\\:layout-margin-block-end-md{--margin-block-end: var(--tcds-space-layout-md);margin-block-end:var(--margin-block-end) !important}.sm\\:layout-padding-block-lg{--padding-block-start: var(--tcds-space-layout-lg);--padding-block-end: var(--tcds-space-layout-lg);--padding-block: var(--padding-block-start) var(--padding-block-end);padding-block-start:var(--padding-block-start) !important;padding-block-end:var(--padding-block-end) !important}.sm\\:layout-padding-block-start-lg{--padding-block-start: var(--tcds-space-layout-lg);padding-block-start:var(--padding-block-start) !important}.sm\\:layout-padding-block-end-lg{--padding-block-end: var(--tcds-space-layout-lg);padding-block-end:var(--padding-block-end) !important}.sm\\:layout-margin-block-lg{--margin-block-start: var(--tcds-space-layout-lg);--margin-block-end: var(--tcds-space-layout-lg);--margin-block: var(--margin-block-start) var(--margin-block-end);margin-block-start:var(--margin-block-start) !important;margin-block-end:var(--margin-block-end) !important}.sm\\:layout-margin-block-start-lg{--margin-block-start: var(--tcds-space-layout-lg);margin-block-start:var(--margin-block-start) !important}.sm\\:layout-margin-block-end-lg{--margin-block-end: var(--tcds-space-layout-lg);margin-block-end:var(--margin-block-end) !important}.sm\\:layout-padding-block-xl{--padding-block-start: var(--tcds-space-layout-xl);--padding-block-end: var(--tcds-space-layout-xl);--padding-block: var(--padding-block-start) var(--padding-block-end);padding-block-start:var(--padding-block-start) !important;padding-block-end:var(--padding-block-end) !important}.sm\\:layout-padding-block-start-xl{--padding-block-start: var(--tcds-space-layout-xl);padding-block-start:var(--padding-block-start) !important}.sm\\:layout-padding-block-end-xl{--padding-block-end: var(--tcds-space-layout-xl);padding-block-end:var(--padding-block-end) !important}.sm\\:layout-margin-block-xl{--margin-block-start: var(--tcds-space-layout-xl);--margin-block-end: var(--tcds-space-layout-xl);--margin-block: var(--margin-block-start) var(--margin-block-end);margin-block-start:var(--margin-block-start) !important;margin-block-end:var(--margin-block-end) !important}.sm\\:layout-margin-block-start-xl{--margin-block-start: var(--tcds-space-layout-xl);margin-block-start:var(--margin-block-start) !important}.sm\\:layout-margin-block-end-xl{--margin-block-end: var(--tcds-space-layout-xl);margin-block-end:var(--margin-block-end) !important}}@media(min-width: 960px){.md\\:component-padding-block-xs{--padding-block-start: var(--tcds-space-layout-xs);--padding-block-end: var(--tcds-space-layout-xs);--padding-block: var(--padding-block-start) var(--padding-block-end);padding-block-start:var(--padding-block-start) !important;padding-block-end:var(--padding-block-end) !important}.md\\:component-padding-block-start-xs{--padding-block-start: var(--tcds-space-layout-xs);padding-block-start:var(--padding-block-start) !important}.md\\:component-padding-block-end-xs{--padding-block-end: var(--tcds-space-layout-xs);padding-block-end:var(--padding-block-end) !important}.md\\:component-margin-block-xs{--margin-block-start: var(--tcds-space-layout-xs);--margin-block-end: var(--tcds-space-layout-xs);--margin-block: var(--margin-block-start) var(--margin-block-end);margin-block-start:var(--margin-block-start) !important;margin-block-end:var(--margin-block-end) !important}.md\\:component-margin-block-start-xs{--margin-block-start: var(--tcds-space-layout-xs);margin-block-start:var(--margin-block-start) !important}.md\\:component-margin-block-end-xs{--margin-block-end: var(--tcds-space-layout-xs);margin-block-end:var(--margin-block-end) !important}.md\\:component-padding-block-sm{--padding-block-start: var(--tcds-space-layout-sm);--padding-block-end: var(--tcds-space-layout-sm);--padding-block: var(--padding-block-start) var(--padding-block-end);padding-block-start:var(--padding-block-start) !important;padding-block-end:var(--padding-block-end) !important}.md\\:component-padding-block-start-sm{--padding-block-start: var(--tcds-space-layout-sm);padding-block-start:var(--padding-block-start) !important}.md\\:component-padding-block-end-sm{--padding-block-end: var(--tcds-space-layout-sm);padding-block-end:var(--padding-block-end) !important}.md\\:component-margin-block-sm{--margin-block-start: var(--tcds-space-layout-sm);--margin-block-end: var(--tcds-space-layout-sm);--margin-block: var(--margin-block-start) var(--margin-block-end);margin-block-start:var(--margin-block-start) !important;margin-block-end:var(--margin-block-end) !important}.md\\:component-margin-block-start-sm{--margin-block-start: var(--tcds-space-layout-sm);margin-block-start:var(--margin-block-start) !important}.md\\:component-margin-block-end-sm{--margin-block-end: var(--tcds-space-layout-sm);margin-block-end:var(--margin-block-end) !important}.md\\:component-padding-block-md{--padding-block-start: var(--tcds-space-layout-md);--padding-block-end: var(--tcds-space-layout-md);--padding-block: var(--padding-block-start) var(--padding-block-end);padding-block-start:var(--padding-block-start) !important;padding-block-end:var(--padding-block-end) !important}.md\\:component-padding-block-start-md{--padding-block-start: var(--tcds-space-layout-md);padding-block-start:var(--padding-block-start) !important}.md\\:component-padding-block-end-md{--padding-block-end: var(--tcds-space-layout-md);padding-block-end:var(--padding-block-end) !important}.md\\:component-margin-block-md{--margin-block-start: var(--tcds-space-layout-md);--margin-block-end: var(--tcds-space-layout-md);--margin-block: var(--margin-block-start) var(--margin-block-end);margin-block-start:var(--margin-block-start) !important;margin-block-end:var(--margin-block-end) !important}.md\\:component-margin-block-start-md{--margin-block-start: var(--tcds-space-layout-md);margin-block-start:var(--margin-block-start) !important}.md\\:component-margin-block-end-md{--margin-block-end: var(--tcds-space-layout-md);margin-block-end:var(--margin-block-end) !important}.md\\:component-padding-block-lg{--padding-block-start: var(--tcds-space-layout-lg);--padding-block-end: var(--tcds-space-layout-lg);--padding-block: var(--padding-block-start) var(--padding-block-end);padding-block-start:var(--padding-block-start) !important;padding-block-end:var(--padding-block-end) !important}.md\\:component-padding-block-start-lg{--padding-block-start: var(--tcds-space-layout-lg);padding-block-start:var(--padding-block-start) !important}.md\\:component-padding-block-end-lg{--padding-block-end: var(--tcds-space-layout-lg);padding-block-end:var(--padding-block-end) !important}.md\\:component-margin-block-lg{--margin-block-start: var(--tcds-space-layout-lg);--margin-block-end: var(--tcds-space-layout-lg);--margin-block: var(--margin-block-start) var(--margin-block-end);margin-block-start:var(--margin-block-start) !important;margin-block-end:var(--margin-block-end) !important}.md\\:component-margin-block-start-lg{--margin-block-start: var(--tcds-space-layout-lg);margin-block-start:var(--margin-block-start) !important}.md\\:component-margin-block-end-lg{--margin-block-end: var(--tcds-space-layout-lg);margin-block-end:var(--margin-block-end) !important}.md\\:component-padding-block-xl{--padding-block-start: var(--tcds-space-layout-xl);--padding-block-end: var(--tcds-space-layout-xl);--padding-block: var(--padding-block-start) var(--padding-block-end);padding-block-start:var(--padding-block-start) !important;padding-block-end:var(--padding-block-end) !important}.md\\:component-padding-block-start-xl{--padding-block-start: var(--tcds-space-layout-xl);padding-block-start:var(--padding-block-start) !important}.md\\:component-padding-block-end-xl{--padding-block-end: var(--tcds-space-layout-xl);padding-block-end:var(--padding-block-end) !important}.md\\:component-margin-block-xl{--margin-block-start: var(--tcds-space-layout-xl);--margin-block-end: var(--tcds-space-layout-xl);--margin-block: var(--margin-block-start) var(--margin-block-end);margin-block-start:var(--margin-block-start) !important;margin-block-end:var(--margin-block-end) !important}.md\\:component-margin-block-start-xl{--margin-block-start: var(--tcds-space-layout-xl);margin-block-start:var(--margin-block-start) !important}.md\\:component-margin-block-end-xl{--margin-block-end: var(--tcds-space-layout-xl);margin-block-end:var(--margin-block-end) !important}.md\\:layout-padding-block-xs{--padding-block-start: var(--tcds-space-layout-xs);--padding-block-end: var(--tcds-space-layout-xs);--padding-block: var(--padding-block-start) var(--padding-block-end);padding-block-start:var(--padding-block-start) !important;padding-block-end:var(--padding-block-end) !important}.md\\:layout-padding-block-start-xs{--padding-block-start: var(--tcds-space-layout-xs);padding-block-start:var(--padding-block-start) !important}.md\\:layout-padding-block-end-xs{--padding-block-end: var(--tcds-space-layout-xs);padding-block-end:var(--padding-block-end) !important}.md\\:layout-margin-block-xs{--margin-block-start: var(--tcds-space-layout-xs);--margin-block-end: var(--tcds-space-layout-xs);--margin-block: var(--margin-block-start) var(--margin-block-end);margin-block-start:var(--margin-block-start) !important;margin-block-end:var(--margin-block-end) !important}.md\\:layout-margin-block-start-xs{--margin-block-start: var(--tcds-space-layout-xs);margin-block-start:var(--margin-block-start) !important}.md\\:layout-margin-block-end-xs{--margin-block-end: var(--tcds-space-layout-xs);margin-block-end:var(--margin-block-end) !important}.md\\:layout-padding-block-sm{--padding-block-start: var(--tcds-space-layout-sm);--padding-block-end: var(--tcds-space-layout-sm);--padding-block: var(--padding-block-start) var(--padding-block-end);padding-block-start:var(--padding-block-start) !important;padding-block-end:var(--padding-block-end) !important}.md\\:layout-padding-block-start-sm{--padding-block-start: var(--tcds-space-layout-sm);padding-block-start:var(--padding-block-start) !important}.md\\:layout-padding-block-end-sm{--padding-block-end: var(--tcds-space-layout-sm);padding-block-end:var(--padding-block-end) !important}.md\\:layout-margin-block-sm{--margin-block-start: var(--tcds-space-layout-sm);--margin-block-end: var(--tcds-space-layout-sm);--margin-block: var(--margin-block-start) var(--margin-block-end);margin-block-start:var(--margin-block-start) !important;margin-block-end:var(--margin-block-end) !important}.md\\:layout-margin-block-start-sm{--margin-block-start: var(--tcds-space-layout-sm);margin-block-start:var(--margin-block-start) !important}.md\\:layout-margin-block-end-sm{--margin-block-end: var(--tcds-space-layout-sm);margin-block-end:var(--margin-block-end) !important}.md\\:layout-padding-block-md{--padding-block-start: var(--tcds-space-layout-md);--padding-block-end: var(--tcds-space-layout-md);--padding-block: var(--padding-block-start) var(--padding-block-end);padding-block-start:var(--padding-block-start) !important;padding-block-end:var(--padding-block-end) !important}.md\\:layout-padding-block-start-md{--padding-block-start: var(--tcds-space-layout-md);padding-block-start:var(--padding-block-start) !important}.md\\:layout-padding-block-end-md{--padding-block-end: var(--tcds-space-layout-md);padding-block-end:var(--padding-block-end) !important}.md\\:layout-margin-block-md{--margin-block-start: var(--tcds-space-layout-md);--margin-block-end: var(--tcds-space-layout-md);--margin-block: var(--margin-block-start) var(--margin-block-end);margin-block-start:var(--margin-block-start) !important;margin-block-end:var(--margin-block-end) !important}.md\\:layout-margin-block-start-md{--margin-block-start: var(--tcds-space-layout-md);margin-block-start:var(--margin-block-start) !important}.md\\:layout-margin-block-end-md{--margin-block-end: var(--tcds-space-layout-md);margin-block-end:var(--margin-block-end) !important}.md\\:layout-padding-block-lg{--padding-block-start: var(--tcds-space-layout-lg);--padding-block-end: var(--tcds-space-layout-lg);--padding-block: var(--padding-block-start) var(--padding-block-end);padding-block-start:var(--padding-block-start) !important;padding-block-end:var(--padding-block-end) !important}.md\\:layout-padding-block-start-lg{--padding-block-start: var(--tcds-space-layout-lg);padding-block-start:var(--padding-block-start) !important}.md\\:layout-padding-block-end-lg{--padding-block-end: var(--tcds-space-layout-lg);padding-block-end:var(--padding-block-end) !important}.md\\:layout-margin-block-lg{--margin-block-start: var(--tcds-space-layout-lg);--margin-block-end: var(--tcds-space-layout-lg);--margin-block: var(--margin-block-start) var(--margin-block-end);margin-block-start:var(--margin-block-start) !important;margin-block-end:var(--margin-block-end) !important}.md\\:layout-margin-block-start-lg{--margin-block-start: var(--tcds-space-layout-lg);margin-block-start:var(--margin-block-start) !important}.md\\:layout-margin-block-end-lg{--margin-block-end: var(--tcds-space-layout-lg);margin-block-end:var(--margin-block-end) !important}.md\\:layout-padding-block-xl{--padding-block-start: var(--tcds-space-layout-xl);--padding-block-end: var(--tcds-space-layout-xl);--padding-block: var(--padding-block-start) var(--padding-block-end);padding-block-start:var(--padding-block-start) !important;padding-block-end:var(--padding-block-end) !important}.md\\:layout-padding-block-start-xl{--padding-block-start: var(--tcds-space-layout-xl);padding-block-start:var(--padding-block-start) !important}.md\\:layout-padding-block-end-xl{--padding-block-end: var(--tcds-space-layout-xl);padding-block-end:var(--padding-block-end) !important}.md\\:layout-margin-block-xl{--margin-block-start: var(--tcds-space-layout-xl);--margin-block-end: var(--tcds-space-layout-xl);--margin-block: var(--margin-block-start) var(--margin-block-end);margin-block-start:var(--margin-block-start) !important;margin-block-end:var(--margin-block-end) !important}.md\\:layout-margin-block-start-xl{--margin-block-start: var(--tcds-space-layout-xl);margin-block-start:var(--margin-block-start) !important}.md\\:layout-margin-block-end-xl{--margin-block-end: var(--tcds-space-layout-xl);margin-block-end:var(--margin-block-end) !important}}@media(min-width: 1312px){.lg\\:component-padding-block-xs{--padding-block-start: var(--tcds-space-layout-xs);--padding-block-end: var(--tcds-space-layout-xs);--padding-block: var(--padding-block-start) var(--padding-block-end);padding-block-start:var(--padding-block-start) !important;padding-block-end:var(--padding-block-end) !important}.lg\\:component-padding-block-start-xs{--padding-block-start: var(--tcds-space-layout-xs);padding-block-start:var(--padding-block-start) !important}.lg\\:component-padding-block-end-xs{--padding-block-end: var(--tcds-space-layout-xs);padding-block-end:var(--padding-block-end) !important}.lg\\:component-margin-block-xs{--margin-block-start: var(--tcds-space-layout-xs);--margin-block-end: var(--tcds-space-layout-xs);--margin-block: var(--margin-block-start) var(--margin-block-end);margin-block-start:var(--margin-block-start) !important;margin-block-end:var(--margin-block-end) !important}.lg\\:component-margin-block-start-xs{--margin-block-start: var(--tcds-space-layout-xs);margin-block-start:var(--margin-block-start) !important}.lg\\:component-margin-block-end-xs{--margin-block-end: var(--tcds-space-layout-xs);margin-block-end:var(--margin-block-end) !important}.lg\\:component-padding-block-sm{--padding-block-start: var(--tcds-space-layout-sm);--padding-block-end: var(--tcds-space-layout-sm);--padding-block: var(--padding-block-start) var(--padding-block-end);padding-block-start:var(--padding-block-start) !important;padding-block-end:var(--padding-block-end) !important}.lg\\:component-padding-block-start-sm{--padding-block-start: var(--tcds-space-layout-sm);padding-block-start:var(--padding-block-start) !important}.lg\\:component-padding-block-end-sm{--padding-block-end: var(--tcds-space-layout-sm);padding-block-end:var(--padding-block-end) !important}.lg\\:component-margin-block-sm{--margin-block-start: var(--tcds-space-layout-sm);--margin-block-end: var(--tcds-space-layout-sm);--margin-block: var(--margin-block-start) var(--margin-block-end);margin-block-start:var(--margin-block-start) !important;margin-block-end:var(--margin-block-end) !important}.lg\\:component-margin-block-start-sm{--margin-block-start: var(--tcds-space-layout-sm);margin-block-start:var(--margin-block-start) !important}.lg\\:component-margin-block-end-sm{--margin-block-end: var(--tcds-space-layout-sm);margin-block-end:var(--margin-block-end) !important}.lg\\:component-padding-block-md{--padding-block-start: var(--tcds-space-layout-md);--padding-block-end: var(--tcds-space-layout-md);--padding-block: var(--padding-block-start) var(--padding-block-end);padding-block-start:var(--padding-block-start) !important;padding-block-end:var(--padding-block-end) !important}.lg\\:component-padding-block-start-md{--padding-block-start: var(--tcds-space-layout-md);padding-block-start:var(--padding-block-start) !important}.lg\\:component-padding-block-end-md{--padding-block-end: var(--tcds-space-layout-md);padding-block-end:var(--padding-block-end) !important}.lg\\:component-margin-block-md{--margin-block-start: var(--tcds-space-layout-md);--margin-block-end: var(--tcds-space-layout-md);--margin-block: var(--margin-block-start) var(--margin-block-end);margin-block-start:var(--margin-block-start) !important;margin-block-end:var(--margin-block-end) !important}.lg\\:component-margin-block-start-md{--margin-block-start: var(--tcds-space-layout-md);margin-block-start:var(--margin-block-start) !important}.lg\\:component-margin-block-end-md{--margin-block-end: var(--tcds-space-layout-md);margin-block-end:var(--margin-block-end) !important}.lg\\:component-padding-block-lg{--padding-block-start: var(--tcds-space-layout-lg);--padding-block-end: var(--tcds-space-layout-lg);--padding-block: var(--padding-block-start) var(--padding-block-end);padding-block-start:var(--padding-block-start) !important;padding-block-end:var(--padding-block-end) !important}.lg\\:component-padding-block-start-lg{--padding-block-start: var(--tcds-space-layout-lg);padding-block-start:var(--padding-block-start) !important}.lg\\:component-padding-block-end-lg{--padding-block-end: var(--tcds-space-layout-lg);padding-block-end:var(--padding-block-end) !important}.lg\\:component-margin-block-lg{--margin-block-start: var(--tcds-space-layout-lg);--margin-block-end: var(--tcds-space-layout-lg);--margin-block: var(--margin-block-start) var(--margin-block-end);margin-block-start:var(--margin-block-start) !important;margin-block-end:var(--margin-block-end) !important}.lg\\:component-margin-block-start-lg{--margin-block-start: var(--tcds-space-layout-lg);margin-block-start:var(--margin-block-start) !important}.lg\\:component-margin-block-end-lg{--margin-block-end: var(--tcds-space-layout-lg);margin-block-end:var(--margin-block-end) !important}.lg\\:component-padding-block-xl{--padding-block-start: var(--tcds-space-layout-xl);--padding-block-end: var(--tcds-space-layout-xl);--padding-block: var(--padding-block-start) var(--padding-block-end);padding-block-start:var(--padding-block-start) !important;padding-block-end:var(--padding-block-end) !important}.lg\\:component-padding-block-start-xl{--padding-block-start: var(--tcds-space-layout-xl);padding-block-start:var(--padding-block-start) !important}.lg\\:component-padding-block-end-xl{--padding-block-end: var(--tcds-space-layout-xl);padding-block-end:var(--padding-block-end) !important}.lg\\:component-margin-block-xl{--margin-block-start: var(--tcds-space-layout-xl);--margin-block-end: var(--tcds-space-layout-xl);--margin-block: var(--margin-block-start) var(--margin-block-end);margin-block-start:var(--margin-block-start) !important;margin-block-end:var(--margin-block-end) !important}.lg\\:component-margin-block-start-xl{--margin-block-start: var(--tcds-space-layout-xl);margin-block-start:var(--margin-block-start) !important}.lg\\:component-margin-block-end-xl{--margin-block-end: var(--tcds-space-layout-xl);margin-block-end:var(--margin-block-end) !important}.lg\\:layout-padding-block-xs{--padding-block-start: var(--tcds-space-layout-xs);--padding-block-end: var(--tcds-space-layout-xs);--padding-block: var(--padding-block-start) var(--padding-block-end);padding-block-start:var(--padding-block-start) !important;padding-block-end:var(--padding-block-end) !important}.lg\\:layout-padding-block-start-xs{--padding-block-start: var(--tcds-space-layout-xs);padding-block-start:var(--padding-block-start) !important}.lg\\:layout-padding-block-end-xs{--padding-block-end: var(--tcds-space-layout-xs);padding-block-end:var(--padding-block-end) !important}.lg\\:layout-margin-block-xs{--margin-block-start: var(--tcds-space-layout-xs);--margin-block-end: var(--tcds-space-layout-xs);--margin-block: var(--margin-block-start) var(--margin-block-end);margin-block-start:var(--margin-block-start) !important;margin-block-end:var(--margin-block-end) !important}.lg\\:layout-margin-block-start-xs{--margin-block-start: var(--tcds-space-layout-xs);margin-block-start:var(--margin-block-start) !important}.lg\\:layout-margin-block-end-xs{--margin-block-end: var(--tcds-space-layout-xs);margin-block-end:var(--margin-block-end) !important}.lg\\:layout-padding-block-sm{--padding-block-start: var(--tcds-space-layout-sm);--padding-block-end: var(--tcds-space-layout-sm);--padding-block: var(--padding-block-start) var(--padding-block-end);padding-block-start:var(--padding-block-start) !important;padding-block-end:var(--padding-block-end) !important}.lg\\:layout-padding-block-start-sm{--padding-block-start: var(--tcds-space-layout-sm);padding-block-start:var(--padding-block-start) !important}.lg\\:layout-padding-block-end-sm{--padding-block-end: var(--tcds-space-layout-sm);padding-block-end:var(--padding-block-end) !important}.lg\\:layout-margin-block-sm{--margin-block-start: var(--tcds-space-layout-sm);--margin-block-end: var(--tcds-space-layout-sm);--margin-block: var(--margin-block-start) var(--margin-block-end);margin-block-start:var(--margin-block-start) !important;margin-block-end:var(--margin-block-end) !important}.lg\\:layout-margin-block-start-sm{--margin-block-start: var(--tcds-space-layout-sm);margin-block-start:var(--margin-block-start) !important}.lg\\:layout-margin-block-end-sm{--margin-block-end: var(--tcds-space-layout-sm);margin-block-end:var(--margin-block-end) !important}.lg\\:layout-padding-block-md{--padding-block-start: var(--tcds-space-layout-md);--padding-block-end: var(--tcds-space-layout-md);--padding-block: var(--padding-block-start) var(--padding-block-end);padding-block-start:var(--padding-block-start) !important;padding-block-end:var(--padding-block-end) !important}.lg\\:layout-padding-block-start-md{--padding-block-start: var(--tcds-space-layout-md);padding-block-start:var(--padding-block-start) !important}.lg\\:layout-padding-block-end-md{--padding-block-end: var(--tcds-space-layout-md);padding-block-end:var(--padding-block-end) !important}.lg\\:layout-margin-block-md{--margin-block-start: var(--tcds-space-layout-md);--margin-block-end: var(--tcds-space-layout-md);--margin-block: var(--margin-block-start) var(--margin-block-end);margin-block-start:var(--margin-block-start) !important;margin-block-end:var(--margin-block-end) !important}.lg\\:layout-margin-block-start-md{--margin-block-start: var(--tcds-space-layout-md);margin-block-start:var(--margin-block-start) !important}.lg\\:layout-margin-block-end-md{--margin-block-end: var(--tcds-space-layout-md);margin-block-end:var(--margin-block-end) !important}.lg\\:layout-padding-block-lg{--padding-block-start: var(--tcds-space-layout-lg);--padding-block-end: var(--tcds-space-layout-lg);--padding-block: var(--padding-block-start) var(--padding-block-end);padding-block-start:var(--padding-block-start) !important;padding-block-end:var(--padding-block-end) !important}.lg\\:layout-padding-block-start-lg{--padding-block-start: var(--tcds-space-layout-lg);padding-block-start:var(--padding-block-start) !important}.lg\\:layout-padding-block-end-lg{--padding-block-end: var(--tcds-space-layout-lg);padding-block-end:var(--padding-block-end) !important}.lg\\:layout-margin-block-lg{--margin-block-start: var(--tcds-space-layout-lg);--margin-block-end: var(--tcds-space-layout-lg);--margin-block: var(--margin-block-start) var(--margin-block-end);margin-block-start:var(--margin-block-start) !important;margin-block-end:var(--margin-block-end) !important}.lg\\:layout-margin-block-start-lg{--margin-block-start: var(--tcds-space-layout-lg);margin-block-start:var(--margin-block-start) !important}.lg\\:layout-margin-block-end-lg{--margin-block-end: var(--tcds-space-layout-lg);margin-block-end:var(--margin-block-end) !important}.lg\\:layout-padding-block-xl{--padding-block-start: var(--tcds-space-layout-xl);--padding-block-end: var(--tcds-space-layout-xl);--padding-block: var(--padding-block-start) var(--padding-block-end);padding-block-start:var(--padding-block-start) !important;padding-block-end:var(--padding-block-end) !important}.lg\\:layout-padding-block-start-xl{--padding-block-start: var(--tcds-space-layout-xl);padding-block-start:var(--padding-block-start) !important}.lg\\:layout-padding-block-end-xl{--padding-block-end: var(--tcds-space-layout-xl);padding-block-end:var(--padding-block-end) !important}.lg\\:layout-margin-block-xl{--margin-block-start: var(--tcds-space-layout-xl);--margin-block-end: var(--tcds-space-layout-xl);--margin-block: var(--margin-block-start) var(--margin-block-end);margin-block-start:var(--margin-block-start) !important;margin-block-end:var(--margin-block-end) !important}.lg\\:layout-margin-block-start-xl{--margin-block-start: var(--tcds-space-layout-xl);margin-block-start:var(--margin-block-start) !important}.lg\\:layout-margin-block-end-xl{--margin-block-end: var(--tcds-space-layout-xl);margin-block-end:var(--margin-block-end) !important}}.margin-inline-auto{margin-inline:auto !important}.margin-inline-start-auto{margin-inline-start:auto !important}.margin-inline-end-auto{margin-inline-end:auto !important}@media(min-width: 320px){.xs\\:margin-inline-auto{margin-inline:auto !important}.xs\\:margin-inline-start-auto{margin-inline-start:auto !important}.xs\\:margin-inline-end-auto{margin-inline-end:auto !important}}@media(min-width: 640px){.sm\\:margin-inline-auto{margin-inline:auto !important}.sm\\:margin-inline-start-auto{margin-inline-start:auto !important}.sm\\:margin-inline-end-auto{margin-inline-end:auto !important}}@media(min-width: 960px){.md\\:margin-inline-auto{margin-inline:auto !important}.md\\:margin-inline-start-auto{margin-inline-start:auto !important}.md\\:margin-inline-end-auto{margin-inline-end:auto !important}}@media(min-width: 1312px){.lg\\:margin-inline-auto{margin-inline:auto !important}.lg\\:margin-inline-start-auto{margin-inline-start:auto !important}.lg\\:margin-inline-end-auto{margin-inline-end:auto !important}}.text-display-1{font:700 3rem/1.06 Fraunces,serif !important;font-variation-settings:"opsz" 70 !important}@media(width >= 960px){.text-display-1{font:700 8rem/1.06 Fraunces,serif !important;font-variation-settings:"opsz" 70 !important}}.text-display-1{color:var(--tcds-color-theme-text-primary)}.text-display-2{font:700 2.625rem/1.33 Fraunces,serif !important;font-variation-settings:"opsz" 70 !important}@media(width >= 960px){.text-display-2{font:700 6rem/1.06 Fraunces,serif !important;font-variation-settings:"opsz" 70 !important}}.text-display-2{color:var(--tcds-color-theme-text-primary)}.text-heading-1{font:3rem/1.06 Fraunces,serif !important}@media(width >= 960px){.text-heading-1{font:4.5rem/1.06 Fraunces,serif !important}}.text-heading-2{font:2.625rem/1.06 Fraunces,serif !important}@media(width >= 960px){.text-heading-2{font:3.75rem/1.06 Fraunces,serif !important}}.text-heading-3{font:2.125rem/1.33 Fraunces,serif !important}@media(width >= 960px){.text-heading-3{font:3rem/1.06 Fraunces,serif !important}}.text-heading-4{font:1.25rem/1.33 Fraunces,serif !important}@media(width >= 960px){.text-heading-4{font:2.625rem/1.33 Fraunces,serif !important}}.text-body-lg{font:400 1.125rem/1.66 Poppins,system-ui,sans-serif !important}.text-body-md{font:400 1rem/1.66 Poppins,system-ui,sans-serif !important}.text-body-sm{font:400 .875rem/1.66 Poppins,system-ui,sans-serif !important}.text-body-xs{font:400 .8125rem/1.66 Poppins,system-ui,sans-serif !important}.text-ui-lg{font:600 1.125rem/1.33 Poppins,system-ui,sans-serif !important}.text-ui-md{font:600 1rem/1.33 Poppins,system-ui,sans-serif !important}.text-ui-sm{font:600 .875rem/1.33 Poppins,system-ui,sans-serif !important}.text-ui-xs{font:500 .8125rem/1.33 Poppins,system-ui,sans-serif !important}.font-family-display{font-family:var(--tcds-font-family-display) !important;font-weight:var(--tcds-font-weight-display)}.font-family-body{font-family:var(--tcds-font-family-body) !important;font-weight:var(--tcds-font-weight-body)}.font-family-ui{font-family:var(--tcds-font-family-ui) !important;font-weight:var(--tcds-font-weight-ui)}.font-family-sans-serif{font-family:var(--tcds-font-stack-sans-serif) !important}.font-family-serif{font-family:var(--tcds-font-stack-serif) !important}.text-align-center{text-align:center !important}.text-align-left,.text-align-inline-start{text-align:inline-start !important}@media(min-width: 320px){.xs\\:text-align-center{text-align:center !important}.xs\\:text-align-left,.xs\\:text-align-inline-start{text-align:inline-start !important}}@media(min-width: 640px){.sm\\:text-align-center{text-align:center !important}.sm\\:text-align-left,.sm\\:text-align-inline-start{text-align:inline-start !important}}@media(min-width: 960px){.md\\:text-align-center{text-align:center !important}.md\\:text-align-left,.md\\:text-align-inline-start{text-align:inline-start !important}}@media(min-width: 1312px){.lg\\:text-align-center{text-align:center !important}.lg\\:text-align-left,.lg\\:text-align-inline-start{text-align:inline-start !important}}.font-variant-tabular-nums{font-variant-numeric:lining-nums tabular-nums !important}.white-space-nowrap{white-space:nowrap}@layer tcds-components{.tcds-button{--tcds-button-background-color: var(--tcds-color-theme-accent);--tcds-button-background-color-hover: color-mix(in oklab, var(--tcds-color-theme-accent), rgb(0 0 0) 10%);--tcds-button-border-color: var(--tcds-button-background-color);--tcds-button-border-color-hover: var(--tcds-button-background-color-hover);--tcds-button-text-color: var(--tcds-color-theme-accent-text-primary);--tcds-button-text-color-hover: var(--tcds-color-theme-accent-text-primary);--tcds-button-padding: 0 1.25rem;--tcds-button-font-size: var(--tcds-font-size-md)}@media(width >= 960px){.tcds-button{--tcds-button-padding: 0 2rem}}.tcds-button{--tcds-button-height: var(--tcds-size-component-lg);--tcds-button-width: auto;background-color:var(--tcds-button-background-color);border:var(--tcds-button-border-width, 2px) solid var(--tcds-button-border-color, var(--tcds-button-background-color));color:var(--tcds-button-text-color);cursor:pointer;font-family:var(--tcds-font-family-ui);font-weight:var(--tcds-font-weight-ui);font-size:var(--tcds-button-font-size);padding:var(--tcds-button-padding);height:var(--tcds-button-height);width:var(--tcds-button-width);border-radius:var(--tcds-button-height);display:inline-flex;gap:.75rem;align-items:center;justify-content:center;text-align:center;text-decoration:none;line-height:1;transition-property:background-color,border-color,color;transition-duration:var(--tcds-motion-duration-productive);transition-timing-function:var(--tcds-motion-easing-translate)}.tcds-button:hover,.tcds-button:active{background-color:var(--tcds-button-background-color-hover);color:var(--tcds-button-text-color-hover);border-color:var(--tcds-button-border-color-hover)}.tcds-button:active{background-color:var(--tcds-button-background-color-active, var(--tcds-button-background-color-hover));color:var(--tcds-button-text-color-active, var(--tcds-button-text-color-hover));border-color:var(--tcds-button-border-color-active, var(--tcds-button-border-color-hover))}.tcds-button tcds-icon,.tcds-button:is(tcds-icon){font-size:var(--tcds-button-icon-size, 0.8em);color:var(--tcds-button-icon-color, inherit)}.tcds-button:is(tcds-icon){--tcds-button-padding: 0 ;--tcds-button-width: var(--tcds-button-height) }.tcds-button--reverse{--tcds-button-background-color: var(--tcds-color-theme-accent-text-primary);--tcds-button-text-color: var(--tcds-color-theme-accent);--tcds-button-background-color-hover: var(--tcds-color-theme-accent);--tcds-button-text-color-hover: var(--tcds-color-palette-white);--tcds-button-border-color-hover: var(--tcds-color-theme-accent);--tcds-button-icon-color: var(--tcds-color-theme-accent)}.tcds-button--large{--tcds-button-padding: 0 1.75rem;--tcds-button-height: var(--tcds-size-component-xl);--tcds-button-font-size: var(--tcds-font-size-lg);--tcds-button-icon-size: 1.85em}@media(width >= 960px){.tcds-button--large{--tcds-button-padding: 0 2.5rem}}.tcds-button--media{--tcds-button-background-color: transparent;--tcds-button-background-color-hover: transparent;--tcds-button-text-color: var(--tcds-color-theme-default-accent);--tcds-button-text-color-hover: color-mix(in oklab, var(--tcds-color-theme-default-accent), rgb(0 0 0) 10%);--tcds-button-text-color-active: var(--tcds-button-text-color-hover);--tcds-button-border-color: var(--tcds-color-theme-default-accent);--tcds-button-border-color-hover: color-mix(in oklab, var(--tcds-color-theme-default-accent), rgb(0 0 0) 10%);--tcds-button-border-width: 1.5px;--tcds-button-height: var(--tcds-size-component-sm);--tcds-button-width: var(--tcds-button-height);--tcds-button-padding: 0;--tcds-button-icon-size: .66em}}.tcds-cta-link{--tcds-button-background-color: var(--tcds-color-theme-accent);--tcds-button-background-color-hover: color-mix(in oklab, var(--tcds-color-theme-accent), rgb(0 0 0) 10%);--tcds-button-border-color: var(--tcds-button-background-color);--tcds-button-border-color-hover: var(--tcds-button-background-color-hover);--tcds-button-text-color: var(--tcds-color-theme-accent-text-primary);--tcds-button-text-color-hover: var(--tcds-color-theme-accent-text-primary);--tcds-button-padding: 0 1.25rem;--tcds-button-font-size: var(--tcds-font-size-md)}@media(width >= 960px){.tcds-cta-link{--tcds-button-padding: 0 2rem}}.tcds-cta-link{--tcds-button-height: var(--tcds-size-component-lg);--tcds-button-width: auto;background-color:var(--tcds-button-background-color) !important;border:var(--tcds-button-border-width, 2px) solid var(--tcds-button-border-color, var(--tcds-button-background-color)) !important;color:var(--tcds-button-text-color) !important;cursor:pointer;font-family:var(--tcds-font-family-ui) !important;font-weight:var(--tcds-font-weight-ui) !important;font-size:var(--tcds-button-font-size) !important;padding:var(--tcds-button-padding) !important;height:var(--tcds-button-height) !important;width:var(--tcds-button-width) !important;border-radius:var(--tcds-button-height) !important;display:inline-flex !important;gap:.75rem !important;align-items:center !important;justify-content:center !important;text-align:center !important;text-decoration:none !important;line-height:1 !important;transition-property:background-color,border-color,color !important;transition-duration:var(--tcds-motion-duration-productive) !important;transition-timing-function:var(--tcds-motion-easing-translate) !important}.tcds-cta-link:hover,.tcds-cta-link:active{background-color:var(--tcds-button-background-color-hover) !important;color:var(--tcds-button-text-color-hover) !important;border-color:var(--tcds-button-border-color-hover) !important}.tcds-cta-link:active{background-color:var(--tcds-button-background-color-active, var(--tcds-button-background-color-hover)) !important;color:var(--tcds-button-text-color-active, var(--tcds-button-text-color-hover)) !important;border-color:var(--tcds-button-border-color-active, var(--tcds-button-border-color-hover)) !important}.tcds-cta-link tcds-icon,.tcds-cta-link:is(tcds-icon){font-size:var(--tcds-button-icon-size, 0.8em) !important;color:var(--tcds-button-icon-color, inherit) !important}.tcds-cta-link:is(tcds-icon){--tcds-button-padding: 0 !important;--tcds-button-width: var(--tcds-button-height) !important}.tcds-cta-link--outline{--tcds-button-background-color: transparent;--tcds-button-text-color: var(--tcds-color-theme-accent);--tcds-button-border-color: var(--tcds-color-theme-accent);--tcds-button-border-color-hover: var(--tcds-button-background-color)}.tcds-cta-link--tertiary{--tcds-button-padding: 0;--tcds-button-height: auto;--tcds-button-background-color: transparent;--tcds-button-background-color-hover: transparent;--tcds-button-text-color: inherit;--tcds-button-text-color-hover: var(--tcds-color-theme-accent);--tcds-button-icon-color: var(--tcds-color-theme-accent);--tcds-button-border-width: 0;--tcds-button-border-color: transparent}.tcds-cta-link:hover{--tcds-cta-link-icon-translate-x: 20%}.tcds-cta-link tcds-icon[icon*=caret-right]{transition:translate var(--tcds-motion-duration-expressive) var(--tcds-motion-easing-enter);translate:var(--tcds-cta-link-icon-translate-x) 0%}/*# sourceMappingURL=shared.css.map */
`;

var _templateObject$3;
function _taggedTemplateLiteral$3(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var disclosureStyles = i(_templateObject$3 || (_templateObject$3 = _taggedTemplateLiteral$3(["\n  :host {\n  }\n\n  :host(:not([hidden])) {\n    display: block;\n  }\n\n  /**\n   * In tabs mode the group's tablist supplies the label, so the author's\n   * heading is suppressed here to keep it from being announced twice.\n   */\n  :host(:state(tabs)) slot[name=title] {\n    display: none;\n  }\n\n  /**\n   * The panel is the tabpanel; hiding the host removes it from layout, the tab\n   * order, and the accessibility tree in one move.\n   */\n  :host(:state(tabs):not(:state(expanded))) {\n    display: none;\n  }\n\n  :host(:state(expanded)) {\n  }\n\n  [part=heading] {\n    border-bottom: 1px solid var(--tcds-color-theme-edge);\n    transition-property: background-color, border-color;\n    transition-duration: var(--tcds-motion-duration-productive);\n    transition-timing-function: var(--tcds-motion-easing-enter);\n  }\n\n  :host(:state(expanded)) [part=heading] {\n    border-color: transparent;\n    background-color: var(--tcds-color-theme-surface);\n  }\n\n  [part=trigger] {\n    appearance: none;\n    background-color: transparent;\n    border: 0;\n    display: flex;\n    justify-content: space-between;\n    width: 100%;\n    padding: var(--tcds-space-8) var(--tcds-space-component-lg);\n    font-family: var(--tcds-font-family-ui);\n    font-weight: var(--tcds-font-weight-ui);\n    font-size: var(--tcds-font-size-2xl);\n    color: var(--tcds-color-theme-text-primary);\n    cursor: pointer;\n  }\n\n  [part=marker] {\n    flex-shrink: 0;\n    font-size: var(--tcds-font-size-md);\n  }\n\n  :host(:state(expanded)) [part=marker] {\n    color: var(--tcds-color-theme-accent);\n  }\n\n  [part=marker] {\n    flex: none;\n  }\n\n  /**\n   * Required for the height animation to clip. The panel is set back to\n   * 'height: auto' once open, so this only bites during the transition.\n   */\n  [part=panel] {\n    overflow: hidden;\n    box-shadow: 0;\n    transition-property: background-color, box-shadow;\n    transition-duration: var(--tcds-motion-duration-productive);\n    transition-timing-function: var(--tcds-motion-easing-enter);\n  }\n\n  :host(:state(expanded)) [part=panel] {\n    background-color: var(--tcds-color-theme-surface);\n    box-shadow: inset 0 -4px 0 var(--tcds-color-theme-accent);\n  }\n\n  [part=panel]:focus-visible {\n    outline: 2px solid currentcolor;\n    outline-offset: 2px;\n  }\n\n  [part=content] {\n    padding-inline: var(--tcds-space-component-xl);\n  }\n\n  :host(:state(plain)) [part=content] {\n    padding-block-start: 0;\n  }\n\n  :host(:state(accordion)) [part=content] {\n    padding-block-end: var(--tcds-space-layout-sm);\n  }\n"])));

var SizeBreakpointMd="960px";// Medium (960px)
var SizeBreakpointLg="1312px";// Large (1312px)
var MotionEasingEnter="cubic-bezier(0, 0.5, 0.5, 1)";// ease-out
var MotionEasingExit="cubic-bezier(0.4, 0, 1, 1)";// ease-in
var MotionDurationProductive=100;var MotionDurationExpressive=200;

function _typeof$5(o) { "@babel/helpers - typeof"; return _typeof$5 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$5(o); }
function _classCallCheck$4(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties$4(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey$5(o.key), o); } }
function _createClass$4(e, r, t) { return r && _defineProperties$4(e.prototype, r), Object.defineProperty(e, "prototype", { writable: false }), e; }
function _toPropertyKey$5(t) { var i = _toPrimitive$5(t, "string"); return "symbol" == _typeof$5(i) ? i : i + ""; }
function _toPrimitive$5(t, r) { if ("object" != _typeof$5(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r); if ("object" != _typeof$5(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return (String )(t); }
function _classPrivateMethodInitSpec$3(e, a) { _checkPrivateRedeclaration$4(e, a), a.add(e); }
function _classPrivateFieldInitSpec$4(e, t, a) { _checkPrivateRedeclaration$4(e, t), t.set(e, a); }
function _checkPrivateRedeclaration$4(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _classPrivateFieldGet$4(s, a) { return s.get(_assertClassBrand$4(s, a)); }
function _classPrivateFieldSet$4(s, a, r) { return s.set(_assertClassBrand$4(s, a), r), r; }
function _assertClassBrand$4(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }

/**
 * @typedef {object} AccordionAnimationConfig
 * @property {() => boolean} isOpen
 * @property {() => HTMLElement|null} getPanel
 * @property {() => HTMLElement|null} getContent
 */

/**
 * Reactive controller that synchronizes a disclosure panel's hidden state and
 * animates transitions between its expanded and collapsed states.
 *
 * @implements {import("lit").ReactiveController}
 * @internal
 */
var _config = /*#__PURE__*/new WeakMap();
var _previousOpen = /*#__PURE__*/new WeakMap();
var _AccordionAnimationController_brand = /*#__PURE__*/new WeakSet();
var AccordionAnimationController = /*#__PURE__*/function () {
  /**
   * @param {import("lit").ReactiveControllerHost} host
   * @param {AccordionAnimationConfig} config
   */
  function AccordionAnimationController(host, config) {
    _classCallCheck$4(this, AccordionAnimationController);
    /**
     * @param {boolean} isOpen
     * @param {HTMLElement} panel
     * @param {HTMLElement} content
     */
    _classPrivateMethodInitSpec$3(this, _AccordionAnimationController_brand);
    /** @type {AccordionAnimationConfig} */
    _classPrivateFieldInitSpec$4(this, _config, void 0);
    /** @type {boolean|undefined} */
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
  var durationExpressive = reducedMotion ? 1 : MotionDurationExpressive;
  if (isOpen) {
    panel.hidden = false;
    content.style.opacity = 0;

    // After animation, we set panel height to auto so it can respond to new
    // elements that add/grow after opening (like nested accordions).
    panel.animate({
      height: ["0", "".concat(panel.scrollHeight, "px")]
    }, {
      duration: duration,
      easing: MotionEasingEnter
    }).onfinish = function () {
      return panel.style.height = "auto";
    };

    // Small tertiary animation for the content to add smoothness.
    content.animate({
      opacity: [0, 1]
    }, {
      duration: durationExpressive,
      easing: MotionEasingEnter,
      delay: 50
    }).onfinish = function () {
      return content.style.opacity = null;
    };
  } else {
    // Reverse animation, reset DOM.
    panel.animate({
      height: ["".concat(panel.scrollHeight, "px"), "0"]
    }, {
      duration: duration,
      easing: MotionEasingEnter
    }).onfinish = function () {
      panel.hidden = "until-found";
      panel.style.height = null;
    };
    content.animate({
      opacity: [1, 0]
    }, {
      duration: duration,
      easing: MotionEasingExit
    });
  }
}

function _typeof$4(o) { "@babel/helpers - typeof"; return _typeof$4 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$4(o); }
var _Disclosure, _templateObject$2, _templateObject2;
var _init_mode, _init_extra_mode, _init_position, _init_extra_position, _init_total, _init_extra_total;
function _slicedToArray$1(r, e) { return _arrayWithHoles$1(r) || _iterableToArrayLimit$1(r, e) || _unsupportedIterableToArray$2(r, e) || _nonIterableRest$1(); }
function _nonIterableRest$1() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit$1(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = true, o = false; try { if (i = (t = t.call(r)).next, 0 === l) ; else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = true, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles$1(r) { if (Array.isArray(r)) return r; }
function _createForOfIteratorHelper$2(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray$2(r)) || e) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: true } : { done: false, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = true, u = false; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = true, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray$2(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$2(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray$2(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$2(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray$2(r); }
function _arrayLikeToArray$2(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _taggedTemplateLiteral$2(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
function _classCallCheck$3(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties$3(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey$4(o.key), o); } }
function _createClass$3(e, r, t) { return r && _defineProperties$3(e.prototype, r), Object.defineProperty(e, "prototype", { writable: false }), e; }
function _callSuper$1(t, o, e) { return o = _getPrototypeOf$1(o), _possibleConstructorReturn$1(t, _isNativeReflectConstruct$1() ? Reflect.construct(o, [], _getPrototypeOf$1(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn$1(t, e) { if (e && ("object" == _typeof$4(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized$1(t); }
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
function _defineProperty$2(e, r, t) { return (r = _toPropertyKey$4(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e; }
function _classPrivateGetter$1(s, r, a) { return a(_assertClassBrand$3(s, r)); }
function _classPrivateFieldSet$3(s, a, r) { return s.set(_assertClassBrand$3(s, a), r), r; }
function _classPrivateFieldGet$3(s, a) { return s.get(_assertClassBrand$3(s, a)); }
function _assertClassBrand$3(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
function _applyDecs$1(e, t, n, r, o, i) { var a, c, u, s, f, l, p, d = Symbol.metadata || Symbol["for"]("Symbol.metadata"), m = Object.defineProperty, h = Object.create, y = [h(null), h(null)], v = t.length; function g(t, n, r) { return function (o, i) { n && (i = o, o = e); for (var a = 0; a < t.length; a++) i = t[a].apply(o, r ? [i] : []); return r ? i : o; }; } function b(e, t, n, r) { if ("function" != typeof e && (r || void 0 !== e)) throw new TypeError(t + " must " + (n || "be") + " a function" + (r ? "" : " or undefined")); return e; } function applyDec(e, t, n, r, o, i, u, s, f, l, p) { function d(e) { if (!p(e)) throw new TypeError("Attempted to access private element on non-instance"); } var h = [].concat(t[0]), v = t[3], w = !u, D = 1 === o, S = 3 === o, j = 4 === o, E = 2 === o; function I(t, n, r) { return function (o, i) { return n && (i = o, o = e), r && r(o), P[t].call(o, i); }; } if (!w) { var P = {}, k = [], F = S ? "get" : j || D ? "set" : "value"; if (f ? (l || D ? P = { get: _setFunctionName$1(function () { return v(this); }, r, "get"), set: function set(e) { t[4](this, e); } } : P[F] = v, l || _setFunctionName$1(P[F], r, E ? "" : F)) : l || (P = Object.getOwnPropertyDescriptor(e, r)), !l && !f) { if ((c = y[+s][r]) && 7 !== (c ^ o)) throw Error("Decorating two elements with the same name (" + P[F].name + ") is not supported yet"); y[+s][r] = o < 3 ? 1 : o; } } for (var N = e, O = h.length - 1; O >= 0; O -= n ? 2 : 1) { var T = b(h[O], "A decorator", "be", true), z = n ? h[O - 1] : void 0, A = {}, H = { kind: ["field", "accessor", "method", "getter", "setter", "class"][o], name: r, metadata: a, addInitializer: function (e, t) { if (e.v) throw new TypeError("attempted to call addInitializer after decoration was finished"); b(t, "An initializer", "be", true), i.push(t); }.bind(null, A) }; if (w) c = T.call(z, N, H), A.v = 1, b(c, "class decorators", "return") && (N = c);else if (H["static"] = s, H["private"] = f, c = H.access = { has: f ? p.bind() : function (e) { return r in e; } }, j || (c.get = f ? E ? function (e) { return d(e), P.value; } : I("get", 0, d) : function (e) { return e[r]; }), E || S || (c.set = f ? I("set", 0, d) : function (e, t) { e[r] = t; }), N = T.call(z, D ? { get: P.get, set: P.set } : P[F], H), A.v = 1, D) { if ("object" == _typeof$4(N) && N) (c = b(N.get, "accessor.get")) && (P.get = c), (c = b(N.set, "accessor.set")) && (P.set = c), (c = b(N.init, "accessor.init")) && k.unshift(c);else if (void 0 !== N) throw new TypeError("accessor decorators must return an object with get, set, or init properties or undefined"); } else b(N, (l ? "field" : "method") + " decorators", "return") && (l ? k.unshift(N) : P[F] = N); } return o < 2 && u.push(g(k, s, 1), g(i, s, 0)), l || w || (f ? D ? u.splice(-1, 0, I("get", s), I("set", s)) : u.push(E ? P[F] : b.call.bind(P[F])) : m(e, r, P)), N; } function w(e) { return m(e, d, { configurable: true, enumerable: true, value: a }); } return void 0 !== i && (a = i[d]), a = h(null == a ? null : a), f = [], l = function l(e) { e && f.push(g(e)); }, p = function p(t, r) { for (var i = 0; i < n.length; i++) { var a = n[i], c = a[1], l = 7 & c; if ((8 & c) == t && !l == r) { var p = a[2], d = !!a[3], m = 16 & c; applyDec(t ? e : e.prototype, a, m, d ? "#" + p : _toPropertyKey$4(p), l, l < 2 ? [] : t ? s = s || [] : u = u || [], f, !!t, d, r, t && d ? function (t) { return _checkInRHS$1(t) === e; } : o); } } }, p(8, 0), p(0, 0), p(8, 1), p(0, 1), l(u), l(s), c = f, v || w(e), { e: c, get c() { var n = []; return v && [w(e = applyDec(e, [t], r, e.name, 5, n)), g(n, 1)]; } }; }
function _toPropertyKey$4(t) { var i = _toPrimitive$4(t, "string"); return "symbol" == _typeof$4(i) ? i : i + ""; }
function _toPrimitive$4(t, r) { if ("object" != _typeof$4(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r); if ("object" != _typeof$4(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _setFunctionName$1(e, t, n) { "symbol" == _typeof$4(t) && (t = (t = t.description) ? "[" + t + "]" : ""); try { Object.defineProperty(e, "name", { configurable: !0, value: n ? n + " " + t : t }); } catch (e) {} return e; }
function _checkInRHS$1(e) { if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (null !== e ? _typeof$4(e) : "null")); return e; }

/**
 * The display mode of the disclosure. Assigned by the parent group, mirrored to
 * a custom state for styling.
 *
 * tabs      - Title suppressed (the group's tablist owns it), panel is a
 *             tabpanel, whole host hidden unless expanded.
 * accordion - Heading wraps a trigger button, panel animates open and shut.
 * plain     - No affordances at all. Real heading, always-visible content.
 */
var MODES = /** @type {const} */["tabs", "accordion", "plain"];
/** @typedef {(typeof MODES)[number]} DisclosureMode */

var DEFAULT_HEADING_LEVEL = 3;
var _A$1 = /*#__PURE__*/new WeakMap();
var _B$1 = /*#__PURE__*/new WeakMap();
var _C$1 = /*#__PURE__*/new WeakMap();
var _internals = /*#__PURE__*/new WeakMap();
var _animation = /*#__PURE__*/new WeakMap();
var _titleContent = /*#__PURE__*/new WeakMap();
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
    // #region Event handlers
    _classPrivateMethodInitSpec$2(_this2, _Disclosure_brand);
    // #region Properties and state
    /**
     * @type {DisclosureMode}
     * @internal
     */
    _classPrivateFieldInitSpec$3(_this2, _A$1, _init_mode(_this2));
    /** @internal */
    _classPrivateFieldInitSpec$3(_this2, _B$1, (_init_extra_mode(_this2), _init_position(_this2)));
    /** @internal */
    _classPrivateFieldInitSpec$3(_this2, _C$1, (_init_extra_position(_this2), _init_total(_this2)));
    // #endregion

    // #region Private variables
    /** @type {ElementInternals} */
    _classPrivateFieldInitSpec$3(_this2, _internals, void _init_extra_total(_this2));
    /** @type {AccordionAnimationController} */
    _classPrivateFieldInitSpec$3(_this2, _animation, void 0);
    /** @type {Node[]|null} */
    _classPrivateFieldInitSpec$3(_this2, _titleContent, null);
    _classPrivateFieldInitSpec$3(_this2, _onBeforeMatch, function () {
      _assertClassBrand$3(_Disclosure_brand, _this2, _requestChange).call(_this2, true);
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
      if (changedProperties.has("mode")) {
        _classPrivateFieldGet$3(_animation, this).reset();
        for (var _i = 0, _MODES = MODES; _i < _MODES.length; _i++) {
          var mode = _MODES[_i];
          if (mode === this.mode) {
            _classPrivateFieldGet$3(_internals, this).states.add(mode);
          } else {
            _classPrivateFieldGet$3(_internals, this).states["delete"](mode);
          }
        }
      }
      if (this.visible) {
        _classPrivateFieldGet$3(_internals, this).states.add("expanded");
      } else {
        _classPrivateFieldGet$3(_internals, this).states["delete"]("expanded");
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _classPrivateGetter2;
      var label = this.titleText;
      return u(_templateObject$2 || (_templateObject$2 = _taggedTemplateLiteral$2(["\n      ", "\n\n      <slot\n        name=\"title\"\n        ?hidden=", "\n        @slotchange=", "\n      ></slot>\n\n      <div\n        part=\"panel\"\n        id=\"panel\"\n        role=", "\n        tabindex=", "\n        aria-label=", "\n        aria-labelledby=", "\n      >\n        <div part=\"content\">\n          <slot></slot>\n        </div>\n      </div>\n    "])), this.mode === "accordion" ? u(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral$2(["\n        <div\n          part=\"heading\"\n          role=\"heading\"\n          aria-level=", "\n        >\n          <button\n            part=\"trigger\"\n            type=\"button\"\n            id=\"trigger\"\n            aria-expanded=", "\n            aria-controls=\"panel\"\n            @click=", "\n          >\n            ", "\n            <tcds-icon\n              part=\"marker\"\n              icon=\"", "\"\n            ></tcds-icon>\n          </button>\n        </div>\n      "])), this.headingLevel, this.expanded ? "true" : "false", _assertClassBrand$3(_Disclosure_brand, this, _onTriggerClick), this.titleContent, this.expanded ? "caret-up" : "caret-down") : A, this.mode !== "plain", _assertClassBrand$3(_Disclosure_brand, this, _onTitleSlotChange), (_classPrivateGetter2 = _classPrivateGetter$1(_Disclosure_brand, this, _get_panelRole)) !== null && _classPrivateGetter2 !== void 0 ? _classPrivateGetter2 : A, this.mode === "tabs" ? "0" : A, this.mode === "tabs" && label ? label : A, this.mode === "accordion" ? "trigger" : A);
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

    // #region Subclass API
    /**
     * Subclasses map this onto their own reflected property — `selected` on tabs,
     * `open` on accordion sections — so each pattern keeps the attribute name
     * that reads naturally in markup.
     *
     * @type {boolean}
     * @internal
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
     *
     * @type {boolean}
     * @internal
     */
  }, {
    key: "visible",
    get: function get() {
      return this.mode === "plain" || this.expanded;
    }

    /**
     * The author's `[slot=title]` element. Scoped to direct children so a nested
     * group's titles are never mistaken for this one's.
     *
     * @type {Element|null}
     * @internal
     */
  }, {
    key: "titleElement",
    get: function get() {
      return this.querySelector(":scope > [slot=title]");
    }

    /**
     * @type {string}
     * @internal
     */
  }, {
    key: "titleText",
    get: function get() {
      var _this$titleElement$te, _this$titleElement;
      return (_this$titleElement$te = (_this$titleElement = this.titleElement) === null || _this$titleElement === void 0 ? void 0 : _this$titleElement.textContent.trim()) !== null && _this$titleElement$te !== void 0 ? _this$titleElement$te : "";
    }

    /**
     * A stable clone of the author's title contents, suitable for rendering
     * inside controls such as accordion triggers and tabs.
     *
     * IDs are stripped because the clone may coexist with the source title in the
     * document.
     *
     * @type {Node[]}
     * @internal
     */
  }, {
    key: "titleContent",
    get: function get() {
      if (_classPrivateFieldGet$3(_titleContent, this) !== null) return _classPrivateFieldGet$3(_titleContent, this);
      var title = this.titleElement;
      var nodes = title ? _toConsumableArray(title.cloneNode(true).childNodes) : [];
      var _iterator = _createForOfIteratorHelper$2(nodes),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var node = _step.value;
          if (!(node instanceof Element)) continue;
          node.removeAttribute("id");
          var _iterator2 = _createForOfIteratorHelper$2(node.querySelectorAll("[id]")),
            _step2;
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var descendant = _step2.value;
              descendant.removeAttribute("id");
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      _classPrivateFieldSet$3(_titleContent, this, nodes);
      return nodes;
    }

    /**
     * Taken from the author's heading tag, so `<h2 slot="title">` and
     * `<h4 slot="title">` both survive being wrapped in a trigger button.
     *
     * @type {number}
     * @protected
     * @internal
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

    /**
     * @type {HTMLElement|null}
     * @protected
     * @internal
     */
  }, {
    key: "panel",
    get: function get() {
      var _this$renderRoot$quer, _this$renderRoot;
      return (_this$renderRoot$quer = (_this$renderRoot = this.renderRoot) === null || _this$renderRoot === void 0 ? void 0 : _this$renderRoot.querySelector("[part=panel]")) !== null && _this$renderRoot$quer !== void 0 ? _this$renderRoot$quer : null;
    }

    /**
     * @type {HTMLElement|null}
     * @protected
     * @internal
     */
  }, {
    key: "content",
    get: function get() {
      var _this$renderRoot$quer2, _this$renderRoot2;
      return (_this$renderRoot$quer2 = (_this$renderRoot2 = this.renderRoot) === null || _this$renderRoot2 === void 0 ? void 0 : _this$renderRoot2.querySelector("[part=content]")) !== null && _this$renderRoot$quer2 !== void 0 ? _this$renderRoot$quer2 : null;
    } // #endregion
  }]);
}(i$1);
_Disclosure = Disclosure;
function _onTriggerClick() {
  _assertClassBrand$3(_Disclosure_brand, this, _requestChange).call(this, !this.expanded);
}
function _onTitleSlotChange() {
  _classPrivateFieldSet$3(_titleContent, this, null);
  this.dispatchEvent(new CustomEvent("tcds-disclosure:title-change", {
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
function _requestChange(expanded) {
  this.dispatchEvent(new CustomEvent("tcds-disclosure:change", {
    detail: {
      expanded: expanded
    },
    bubbles: true,
    composed: true
  }));
}
var _applyDecs$e$1 = _slicedToArray$1(_applyDecs$1(_Disclosure, [], [[n({
  type: String,
  attribute: false
}), 1, "mode"], [n({
  type: Number,
  attribute: false
}), 1, "position"], [n({
  type: Number,
  attribute: false
}), 1, "total"]], 0, void 0, i$1).e, 6);
_init_mode = _applyDecs$e$1[0];
_init_extra_mode = _applyDecs$e$1[1];
_init_position = _applyDecs$e$1[2];
_init_extra_position = _applyDecs$e$1[3];
_init_total = _applyDecs$e$1[4];
_init_extra_total = _applyDecs$e$1[5];
_defineProperty$2(Disclosure, "styles", [styles, disclosureStyles]);

function _typeof$3(o) { "@babel/helpers - typeof"; return _typeof$3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$3(o); }
function _classCallCheck$2(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties$2(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey$3(o.key), o); } }
function _createClass$2(e, r, t) { return r && _defineProperties$2(e.prototype, r), Object.defineProperty(e, "prototype", { writable: false }), e; }
function _toPropertyKey$3(t) { var i = _toPrimitive$3(t, "string"); return "symbol" == _typeof$3(i) ? i : i + ""; }
function _toPrimitive$3(t, r) { if ("object" != _typeof$3(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r); if ("object" != _typeof$3(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return (String )(t); }
function _classPrivateMethodInitSpec$1(e, a) { _checkPrivateRedeclaration$2(e, a), a.add(e); }
function _classPrivateFieldInitSpec$2(e, t, a) { _checkPrivateRedeclaration$2(e, t), t.set(e, a); }
function _checkPrivateRedeclaration$2(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _classPrivateFieldGet$2(s, a) { return s.get(_assertClassBrand$2(s, a)); }
function _classPrivateFieldSet$2(s, a, r) { return s.set(_assertClassBrand$2(s, a), r), r; }
function _assertClassBrand$2(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
var _host = /*#__PURE__*/new WeakMap();
var _query = /*#__PURE__*/new WeakMap();
var _list = /*#__PURE__*/new WeakMap();
var _onChange = /*#__PURE__*/new WeakMap();
var _MediaQueryController_brand = /*#__PURE__*/new WeakSet();
/**
 * Tracks a media query and requests a host update whenever it starts or stops
 * matching. The query itself is reassignable, so a host can expose it as a
 * reactive property without managing listeners.
 *
 * @implements {import("lit").ReactiveController}
 * @internal
 */
var MediaQueryController = /*#__PURE__*/function () {
  /**
   * @param {import("lit").ReactiveElement} host
   * @param {string|null} query - A media query, e.g. `(max-width: 1000px)`.
   */
  function MediaQueryController(host) {
    var _this = this;
    var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    _classCallCheck$2(this, MediaQueryController);
    _classPrivateMethodInitSpec$1(this, _MediaQueryController_brand);
    /** @type {import("lit").ReactiveElement} */
    _classPrivateFieldInitSpec$2(this, _host, void 0);
    /** @type {string|null} */
    _classPrivateFieldInitSpec$2(this, _query, null);
    /** @type {MediaQueryList|null} */
    _classPrivateFieldInitSpec$2(this, _list, null);
    _classPrivateFieldInitSpec$2(this, _onChange, function () {
      _classPrivateFieldGet$2(_host, _this).requestUpdate();
    });
    _classPrivateFieldSet$2(_host, this, host);
    host.addController(this);
    this.query = query;
  }
  return _createClass$2(MediaQueryController, [{
    key: "query",
    get: function get() {
      return _classPrivateFieldGet$2(_query, this);
    }

    /**
     * @param {string|null} query
     */,
    set: function set(query) {
      var next = query || null;
      if (next === _classPrivateFieldGet$2(_query, this)) return;
      _assertClassBrand$2(_MediaQueryController_brand, this, _stopListening).call(this);
      _classPrivateFieldSet$2(_query, this, next);
      _classPrivateFieldSet$2(_list, this, next ? matchMedia(next) : null);
      _assertClassBrand$2(_MediaQueryController_brand, this, _startListening).call(this);
      _classPrivateFieldGet$2(_host, this).requestUpdate();
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
  if (!_classPrivateFieldGet$2(_list, this) || !_classPrivateFieldGet$2(_host, this).isConnected) return;
  _classPrivateFieldGet$2(_list, this).addEventListener("change", _classPrivateFieldGet$2(_onChange, this));
}
function _stopListening() {
  var _classPrivateFieldGet4;
  (_classPrivateFieldGet4 = _classPrivateFieldGet$2(_list, this)) === null || _classPrivateFieldGet4 === void 0 || _classPrivateFieldGet4.removeEventListener("change", _classPrivateFieldGet$2(_onChange, this));
}

function _typeof$2(o) { "@babel/helpers - typeof"; return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$2(o); }
function _classCallCheck$1(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties$1(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey$2(o.key), o); } }
function _createClass$1(e, r, t) { return r && _defineProperties$1(e.prototype, r), Object.defineProperty(e, "prototype", { writable: false }), e; }
function _toPropertyKey$2(t) { var i = _toPrimitive$2(t, "string"); return "symbol" == _typeof$2(i) ? i : i + ""; }
function _toPrimitive$2(t, r) { if ("object" != _typeof$2(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r); if ("object" != _typeof$2(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return (String )(t); }
function _classPrivateFieldInitSpec$1(e, t, a) { _checkPrivateRedeclaration$1(e, t), t.set(e, a); }
function _checkPrivateRedeclaration$1(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _classPrivateFieldGet$1(s, a) { return s.get(_assertClassBrand$1(s, a)); }
function _classPrivateFieldSet$1(s, a, r) { return s.set(_assertClassBrand$1(s, a), r), r; }
function _assertClassBrand$1(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
var _onResolve = /*#__PURE__*/new WeakMap();
var _onHashChange = /*#__PURE__*/new WeakMap();
/**
 * Resolves the document's fragment identifier to an element and hands it to the
 * host, on connect, on `hashchange`, and on demand.
 *
 * The host decides what a match means. This controller only answers the
 * question "what element is the URL pointing at right now?"
 *
 * @implements {import("lit").ReactiveController}
 * @internal
 */
var DeepLinkController = /*#__PURE__*/function () {
  /**
   * @param {import("lit").ReactiveControllerHost} host
   * @param {(target: HTMLElement) => void} onResolve - Called with the matched
   *   element. Not called at all when the URL has no fragment, or when the
   *   fragment matches nothing in the document.
   */
  function DeepLinkController(host, onResolve) {
    var _this = this;
    _classCallCheck$1(this, DeepLinkController);
    _classPrivateFieldInitSpec$1(this, _onResolve, void 0);
    _classPrivateFieldInitSpec$1(this, _onHashChange, function () {
      _this.resolve();
    });
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

function _typeof$1(o) { "@babel/helpers - typeof"; return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$1(o); }
var _DisclosureGroup, _templateObject;
var _init_media, _init_extra_media, _init_label, _init_extra_label, _init_revision, _get_revision, _set_revision, _init_extra_revision, _init_assigned, _get_assigned, _init_extra_assigned;
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray$1(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = true, o = false; try { if (i = (t = t.call(r)).next, 0 === l) ; else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = true, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _createForOfIteratorHelper$1(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray$1(r)) || e) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: true } : { done: false, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = true, u = false; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = true, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray$1(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray$1(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$1(r, a) : void 0; } }
function _arrayLikeToArray$1(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey$1(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), Object.defineProperty(e, "prototype", { writable: false }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof$1(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
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
function _defineProperty$1(e, r, t) { return (r = _toPropertyKey$1(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e; }
function _classPrivateSetter(s, r, a, t) { return r(_assertClassBrand(s, a), t), t; }
function _classPrivateGetter(s, r, a) { return a(_assertClassBrand(s, r)); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
function _applyDecs(e, t, n, r, o, i) { var a, c, u, s, f, l, p, d = Symbol.metadata || Symbol["for"]("Symbol.metadata"), m = Object.defineProperty, h = Object.create, y = [h(null), h(null)], v = t.length; function g(t, n, r) { return function (o, i) { n && (i = o, o = e); for (var a = 0; a < t.length; a++) i = t[a].apply(o, r ? [i] : []); return r ? i : o; }; } function b(e, t, n, r) { if ("function" != typeof e && (r || void 0 !== e)) throw new TypeError(t + " must " + (n || "be") + " a function" + (r ? "" : " or undefined")); return e; } function applyDec(e, t, n, r, o, i, u, s, f, l, p) { function d(e) { if (!p(e)) throw new TypeError("Attempted to access private element on non-instance"); } var h = [].concat(t[0]), v = t[3], w = !u, D = 1 === o, S = 3 === o, j = 4 === o, E = 2 === o; function I(t, n, r) { return function (o, i) { return n && (i = o, o = e), r && r(o), P[t].call(o, i); }; } if (!w) { var P = {}, k = [], F = S ? "get" : j || D ? "set" : "value"; if (f ? (l || D ? P = { get: _setFunctionName(function () { return v(this); }, r, "get"), set: function set(e) { t[4](this, e); } } : P[F] = v, l || _setFunctionName(P[F], r, E ? "" : F)) : l || (P = Object.getOwnPropertyDescriptor(e, r)), !l && !f) { if ((c = y[+s][r]) && 7 !== (c ^ o)) throw Error("Decorating two elements with the same name (" + P[F].name + ") is not supported yet"); y[+s][r] = o < 3 ? 1 : o; } } for (var N = e, O = h.length - 1; O >= 0; O -= n ? 2 : 1) { var T = b(h[O], "A decorator", "be", true), z = n ? h[O - 1] : void 0, A = {}, H = { kind: ["field", "accessor", "method", "getter", "setter", "class"][o], name: r, metadata: a, addInitializer: function (e, t) { if (e.v) throw new TypeError("attempted to call addInitializer after decoration was finished"); b(t, "An initializer", "be", true), i.push(t); }.bind(null, A) }; if (w) c = T.call(z, N, H), A.v = 1, b(c, "class decorators", "return") && (N = c);else if (H["static"] = s, H["private"] = f, c = H.access = { has: f ? p.bind() : function (e) { return r in e; } }, j || (c.get = f ? E ? function (e) { return d(e), P.value; } : I("get", 0, d) : function (e) { return e[r]; }), E || S || (c.set = f ? I("set", 0, d) : function (e, t) { e[r] = t; }), N = T.call(z, D ? { get: P.get, set: P.set } : P[F], H), A.v = 1, D) { if ("object" == _typeof$1(N) && N) (c = b(N.get, "accessor.get")) && (P.get = c), (c = b(N.set, "accessor.set")) && (P.set = c), (c = b(N.init, "accessor.init")) && k.unshift(c);else if (void 0 !== N) throw new TypeError("accessor decorators must return an object with get, set, or init properties or undefined"); } else b(N, (l ? "field" : "method") + " decorators", "return") && (l ? k.unshift(N) : P[F] = N); } return o < 2 && u.push(g(k, s, 1), g(i, s, 0)), l || w || (f ? D ? u.splice(-1, 0, I("get", s), I("set", s)) : u.push(E ? P[F] : b.call.bind(P[F])) : m(e, r, P)), N; } function w(e) { return m(e, d, { configurable: true, enumerable: true, value: a }); } return void 0 !== i && (a = i[d]), a = h(null == a ? null : a), f = [], l = function l(e) { e && f.push(g(e)); }, p = function p(t, r) { for (var i = 0; i < n.length; i++) { var a = n[i], c = a[1], l = 7 & c; if ((8 & c) == t && !l == r) { var p = a[2], d = !!a[3], m = 16 & c; applyDec(t ? e : e.prototype, a, m, d ? "#" + p : _toPropertyKey$1(p), l, l < 2 ? [] : t ? s = s || [] : u = u || [], f, !!t, d, r, t && d ? function (t) { return _checkInRHS(t) === e; } : o); } } }, p(8, 0), p(0, 0), p(8, 1), p(0, 1), l(u), l(s), c = f, v || w(e), { e: c, get c() { var n = []; return v && [w(e = applyDec(e, [t], r, e.name, 5, n)), g(n, 1)]; } }; }
function _toPropertyKey$1(t) { var i = _toPrimitive$1(t, "string"); return "symbol" == _typeof$1(i) ? i : i + ""; }
function _toPrimitive$1(t, r) { if ("object" != _typeof$1(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r); if ("object" != _typeof$1(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _setFunctionName(e, t, n) { "symbol" == _typeof$1(t) && (t = (t = t.description) ? "[" + t + "]" : ""); try { Object.defineProperty(e, "name", { configurable: !0, value: n ? n + " " + t : t }); } catch (e) {} return e; }
function _checkInRHS(e) { if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (null !== e ? _typeof$1(e) : "null")); return e; }

/** @import {DisclosureMode} from "@/components/_shared/base/Disclosure" */
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
     * Accessible name for the group's own controls. Optional.
     */
    _classPrivateFieldInitSpec(_this, _B, (_init_extra_media(_this), _init_label(_this)));
    /**
     * Bumped whenever the assigned children change. `items` reads live DOM, so
     * something reactive has to stand in for it.
     */
    _classPrivateFieldInitSpec(_this, _C, (_init_extra_label(_this), _init_revision(_this, 0)));
    // #endregion
    // #region Private variables
    /** @type {HTMLElement[]} */
    _classPrivateFieldInitSpec(_this, _D, (_init_extra_revision(_this), _init_assigned(_this)));
    _classPrivateFieldInitSpec(_this, _mediaQuery, void _init_extra_assigned(_this));
    _classPrivateFieldInitSpec(_this, _deepLink, void 0);
    /**
     * The item whose state changed most recently. When an exclusive group finds
     * more than one item expanded, this is the one that wins.
     */
    /** @type {Disclosure|null} */
    _classPrivateFieldInitSpec(_this, _preferred, null);
    /** @type {string|null} */
    _classPrivateFieldInitSpec(_this, _signature, null);
    /**
     * @param {CustomEvent<{expanded: boolean}>} event
     */
    _classPrivateFieldInitSpec(_this, _onItemChange, function (event) {
      var item = event.target;
      if (!(item instanceof Disclosure)) return;
      if (!_this.items.includes(item)) return;
      event.stopPropagation();
      _assertClassBrand(_DisclosureGroup_brand, _this, _setExpanded).call(_this, item, event.detail.expanded);
    });
    /**
     * @param {CustomEvent} event
     */
    _classPrivateFieldInitSpec(_this, _onItemTitleChange, function (event) {
      var item = event.target;
      if (!(item instanceof Disclosure)) return;
      if (!_this.items.includes(item)) return;
      event.stopPropagation();
      _this.requestUpdate();
    });
    /**
     * @param {Element} target
     */
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
    _this.addEventListener("tcds-disclosure:change", _classPrivateFieldGet(_onItemChange, _this));
    _this.addEventListener("tcds-disclosure:title-change", _classPrivateFieldGet(_onItemTitleChange, _this));
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
     *
     * @type {DisclosureMode}
     * @protected
     * @internal
     */
  }, {
    key: "defaultMode",
    get: function get() {
      return "accordion";
    }

    /**
     * The alternate pattern presented when `media` does not match.
     *
     * @type {DisclosureMode}
     * @protected
     * @internal
     */
  }, {
    key: "mediaMode",
    get: function get() {
      return "plain";
    }

    /**
     * Whether more than one item may be expanded at once.
     *
     * @type {boolean}
     * @protected
     * @internal
     */
  }, {
    key: "allowsMultiple",
    get: function get() {
      return false;
    }

    /**
     * Whether exactly one item must always be expanded. True for tabs, where
     * there is no such thing as no tab being selected.
     *
     * @type {boolean}
     * @protected
     * @internal
     */
  }, {
    key: "requiresSelection",
    get: function get() {
      return false;
    }

    /**
     * Chrome rendered above the items — a tablist, expand/collapse buttons.
     *
     * @protected
     * @internal
     */
  }, {
    key: "renderHeader",
    value: function renderHeader() {
      return A;
    }
    // #endregion

    // #region Public API
    /** @type {DisclosureMode} */
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
     *
     * @type {Disclosure[]}
     */
  }, {
    key: "items",
    get: function get() {
      var _classPrivateGetter$f, _classPrivateGetter2;
      return (_classPrivateGetter$f = (_classPrivateGetter2 = _classPrivateGetter(_DisclosureGroup_brand, this, _get_assigned)) === null || _classPrivateGetter2 === void 0 ? void 0 : _classPrivateGetter2.filter(function (element) {
        return element instanceof Disclosure;
      })) !== null && _classPrivateGetter$f !== void 0 ? _classPrivateGetter$f : [];
    }

    /** @type {Disclosure[]} */
  }, {
    key: "expandedItems",
    get: function get() {
      return this.items.filter(function (item) {
        return item.expanded;
      });
    }

    /**
     * Expands a specific disclosure item.
     *
     * @param {Disclosure} item - Must be a disclosure item.
     */
  }, {
    key: "expand",
    value: function expand(item) {
      _assertClassBrand(_DisclosureGroup_brand, this, _setExpanded).call(this, item, true);
    }

    /**
     * Collapses a specific disclosure item.
     *
     * @param {Disclosure} item - Must be a disclosure item.
     */
  }, {
    key: "collapse",
    value: function collapse(item) {
      _assertClassBrand(_DisclosureGroup_brand, this, _setExpanded).call(this, item, false);
    }

    /**
     * Toggles an item based on whether it's currently expanded.
     *
     * @param {Disclosure} item - Must be a disclosure item.
     */
  }, {
    key: "toggle",
    value: function toggle(item) {
      _assertClassBrand(_DisclosureGroup_brand, this, _setExpanded).call(this, item, !item.expanded);
    }

    /**
     * Expands all disclosure items in a disclosure group.
     */
  }, {
    key: "expandAll",
    value: function expandAll() {
      if (!this.allowsMultiple) return;
      var _iterator = _createForOfIteratorHelper$1(this.items),
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

    /**
     * Collapses all disclosure items in a disclosure group.
     */
  }, {
    key: "collapseAll",
    value: function collapseAll() {
      var _iterator2 = _createForOfIteratorHelper$1(this.items),
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

    // #region Event handlers

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
/**
 * @param {Disclosure} item
 * @param {boolean} expanded
 */
function _setExpanded(item, expanded) {
  if (!this.items.includes(item)) return;
  if (!expanded && this.requiresSelection && this.expandedItems.length <= 1) return;
  if (expanded && !this.allowsMultiple) {
    var _iterator3 = _createForOfIteratorHelper$1(this.expandedItems),
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
/**
 * Synchronizes each disclosure item with the group's current presentation
 * mode, position, and item count, then enforces expansion/selection
 * invariants.
 */
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
 *
 * @param {Disclosure[]} items
 */
function _enforce(items) {
  if (items.length === 0) return;
  var expanded = items.filter(function (item) {
    return item.expanded;
  });
  if (!this.allowsMultiple && expanded.length > 1) {
    var keep = expanded.includes(_classPrivateFieldGet(_preferred, this)) ? _classPrivateFieldGet(_preferred, this) : expanded[0];
    var _iterator4 = _createForOfIteratorHelper$1(expanded),
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
  this.dispatchEvent(new CustomEvent("".concat(this.localName, ":change"), {
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
_defineProperty$1(DisclosureGroup, "styles", [styles, groupStyles]);

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), true).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: true } : { done: false, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = true, u = false; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = true, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
/**
 * Pause any media inside a subtree that is about to be hidden (dialog closed,
 * carousel slide deactivated, tab panel switched, etc.), and restore it when
 * the subtree becomes visible again.
 *
 * Handles:
 * - <video> / <audio> -> native pause()
 * - YouTube iframes   -> postMessage (requires enablejsapi=1 in the src)
 * - Vimeo iframes     -> postMessage (no extra params needed)
 * - any other iframe  -> detach src to about:blank, restore later
 *
 * Autoplaying, looped, muted media is read as decorative background video and
 * resumes on its own. Everything else stays paused unless `resume` is passed,
 * so nothing with a soundtrack restarts without the caller asking for it.
 *
 * State is stored in data-* attributes rather than a WeakMap so it survives
 * cloneNode()/innerHTML round-trips and is visible in devtools.
 */

var BLANK = "about:blank";
var MEDIA_SELECTOR = "video, audio, iframe";
var OPT_OUT_SELECTOR = "[data-autopause=\"off\"]";
var YOUTUBE_HOSTS = new Set(["www.youtube.com", "youtube.com", "m.youtube.com", "www.youtube-nocookie.com", "youtube-nocookie.com"]);
var VIMEO_HOSTS = new Set(["player.vimeo.com"]);
var YOUTUBE_PAUSE = JSON.stringify({
  event: "command",
  func: "pauseVideo",
  args: []
});
var YOUTUBE_PLAY = JSON.stringify({
  event: "command",
  func: "playVideo",
  args: []
});
var VIMEO_PAUSE = JSON.stringify({
  method: "pause"
});
var VIMEO_PLAY = JSON.stringify({
  method: "play"
});

/**
 * postMessage sent before a player has registered its own listener is dropped
 * with no acknowledgement, so the iframe's load event stands in for readiness.
 * A frame that finished loading before prepareMedia() saw it is never marked
 * and takes the detach path instead: slower, but always correct.
 */
var trackedFrames = new WeakSet();
var readyFrames = new WeakSet();
function trackReadiness(iframe) {
  if (trackedFrames.has(iframe)) return;
  trackedFrames.add(iframe);
  iframe.addEventListener("load", function () {
    if (iframe.getAttribute("src") === BLANK) readyFrames["delete"](iframe);else readyFrames.add(iframe);
  });
}
function collectMedia(root, deep) {
  var found = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new Set();
  if (!root) return found;
  if (typeof root.matches === "function" && root.matches(MEDIA_SELECTOR)) {
    found.add(root);
  }
  if (typeof root.querySelectorAll !== "function") return found;
  var _iterator = _createForOfIteratorHelper(root.querySelectorAll(MEDIA_SELECTOR)),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _el = _step.value;
      found.add(_el);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  if (deep) {
    var _iterator2 = _createForOfIteratorHelper(root.querySelectorAll("*")),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var el = _step2.value;
        if (el.shadowRoot) collectMedia(el.shadowRoot, deep, found);
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  }
  return found;
}

/**
 * closest() deliberately stops at the shadow boundary — an opt-out on a host
 * element does not silently disable autopause for everything inside it.
 */
function isOptedOut(el) {
  return typeof el.closest === "function" && el.closest(OPT_OUT_SELECTOR) !== null;
}
function iframeUrl(iframe) {
  var raw = iframe.getAttribute("src");
  if (!raw || raw === BLANK) return null;
  try {
    // Resolves protocol-relative and relative URLs.
    return new URL(raw, document.baseURI);
  } catch (_unused) {
    return null;
  }
}
function post(iframe, origin, payload) {
  try {
    if (!iframe.contentWindow) return false;
    // Target the embed's own origin rather than "*" so the command isn't
    // readable by an unrelated document that happens to be loaded there.
    iframe.contentWindow.postMessage(payload, origin);
    return true;
  } catch (_unused2) {
    return false;
  }
}
function stripAutoplay(href) {
  try {
    var url = new URL(href, document.baseURI);
    url.searchParams["delete"]("autoplay");
    url.searchParams["delete"]("autostart"); // some third-party players
    return url.href;
  } catch (_unused3) {
    return href;
  }
}

/**
 * Decorative background video: no soundtrack to interrupt and no end to reach,
 * so restarting it can't surprise anyone. `muted` is read live rather than from
 * the attribute, so anything unmuted at runtime loses the exemption.
 */
function isBackgroundMedia(el) {
  return el.autoplay && el.loop && el.muted;
}
function isBackgroundEmbed(url) {
  var params = url.searchParams;
  if (params.get("background") === "1") return true; // Vimeo background mode

  return params.get("autoplay") === "1" && params.get("loop") === "1" && (params.get("mute") === "1" || params.get("muted") === "1");
}

/**
 * Whether an earlier pauseMedia() already recorded this element. Bailing out on
 * it keeps the first scope to pause something as its owner, which is what makes
 * nested scopes restore correctly.
 */
function isHandled(el) {
  return el.dataset.autopauseResume !== undefined || el.dataset.autopauseOwner !== undefined;
}
function mark(el, _ref, background) {
  var remember = _ref.remember,
    owner = _ref.owner;
  if (remember) el.dataset.autopauseResume = background ? "auto" : "true";
  if (owner) el.dataset.autopauseOwner = owner;
}
function playEmbed(el) {
  var url = iframeUrl(el);
  if (!url || !readyFrames.has(el)) return false;
  if (YOUTUBE_HOSTS.has(url.hostname)) return post(el, url.origin, YOUTUBE_PLAY);
  if (VIMEO_HOSTS.has(url.hostname)) return post(el, url.origin, VIMEO_PLAY);
  return false;
}
function pauseHtmlMedia(el, opts) {
  if (opts.respectPictureInPicture && document.pictureInPictureElement === el) {
    // The user explicitly popped this out; it is no longer "inside" the
    // component in any meaningful sense.
    return "skipped:pip";
  }
  if (opts.respectFullscreen && document.fullscreenElement === el) {
    return "skipped:fullscreen";
  }
  if (isHandled(el)) return "noop:already-paused";
  var background = isBackgroundMedia(el);

  // Background video a frame into page load has often not started yet, and
  // returning here would leave it free to start once we've walked away.
  if (el.paused && !background) return "noop:already-paused";
  mark(el, opts, background);
  el.pause();
  return "paused:native";
}
function pauseIframe(el, opts) {
  var url = iframeUrl(el);
  if (!url) return "noop:no-src";
  if (isHandled(el)) return "noop:already-paused";
  var background = isBackgroundEmbed(url);
  var youtube = YOUTUBE_HOSTS.has(url.hostname);

  // Both APIs ignore commands sent before the player loads, and YouTube's also
  // needs enablejsapi=1 to have been in the URL at load time. Neither reports
  // failure, so anything unconfirmed falls through to detaching.
  if (readyFrames.has(el)) {
    if (youtube && url.searchParams.get("enablejsapi") === "1") {
      if (post(el, url.origin, YOUTUBE_PAUSE)) {
        mark(el, opts, background);
        return "paused:youtube-api";
      }
    } else if (VIMEO_HOSTS.has(url.hostname)) {
      if (post(el, url.origin, VIMEO_PAUSE)) {
        mark(el, opts, background);
        return "paused:vimeo-api";
      }
    }
  }

  // Fallback: release the embed entirely. Going to about:blank rather than
  // reassigning the same URL means we don't pay for a reload while hidden.
  readyFrames["delete"](el);
  el.dataset.autopauseSrc = url.href;
  mark(el, opts, background);
  el.setAttribute("src", BLANK);
  return "paused:detached";
}

/**
 * Pause all media within `root`.
 *
 * @param {Element|Document|ShadowRoot} root
 * @param {object} [options]
 * @param {boolean} [options.deep=true]     descend into open shadow roots
 * @param {boolean} [options.remember=true] mark elements so restoreMedia() can
 *   resume them
 * @param {string} [options.owner=null]     tag whatever this call pauses, so a
 *   matching restoreMedia() leaves media paused by a nested scope alone
 * @param {boolean} [options.respectPictureInPicture=true]
 * @param {boolean} [options.respectFullscreen=true]
 * @returns {Array<{element: Element, result: string}>} for logging/tests
 */
function pauseMedia() {
  var root = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var opts = _objectSpread({
    deep: true,
    remember: true,
    owner: null,
    respectPictureInPicture: true,
    respectFullscreen: true
  }, options);
  var results = [];
  var _iterator3 = _createForOfIteratorHelper(collectMedia(root, opts.deep)),
    _step3;
  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var el = _step3.value;
      if (isOptedOut(el)) {
        results.push({
          element: el,
          result: "skipped:opt-out"
        });
        continue;
      }
      var tag = el.tagName.toLowerCase();
      var result = tag === "iframe" ? pauseIframe(el, opts) : pauseHtmlMedia(el, opts);
      results.push({
        element: el,
        result: result
      });
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }
  return results;
}

/**
 * Undo pauseMedia() for a subtree that is becoming visible again. Background
 * video restarts either way; `resume` additionally restarts media that was
 * playing under its own steam when it was paused.
 *
 * @param {Element|Document|ShadowRoot} root
 * @param {object} [options]
 * @param {boolean} [options.deep=true]
 * @param {boolean} [options.resume=false]
 * @param {string} [options.owner=null] only touch media tagged with this owner
 */
function restoreMedia() {
  var root = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _options$deep = options.deep,
    deep = _options$deep === void 0 ? true : _options$deep,
    _options$resume = options.resume,
    resume = _options$resume === void 0 ? false : _options$resume,
    _options$owner = options.owner,
    owner = _options$owner === void 0 ? null : _options$owner;
  var results = [];
  var _iterator4 = _createForOfIteratorHelper(collectMedia(root, deep)),
    _step4;
  try {
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
      var el = _step4.value;
      // Media paused by a nested scope belongs to that scope; it stays paused
      // until the scope that owns it decides otherwise.
      if (owner && el.dataset.autopauseOwner !== owner) {
        results.push({
          element: el,
          result: "skipped:other-owner"
        });
        continue;
      }
      var flag = el.dataset.autopauseResume;
      var shouldResume = flag === "auto" || resume && flag === "true";
      delete el.dataset.autopauseOwner;
      delete el.dataset.autopauseResume;
      if (el.tagName.toLowerCase() === "iframe") {
        var src = el.dataset.autopauseSrc;

        // No stored src means it was paused over postMessage and is still
        // loaded, so it only needs telling to start again.
        if (!src) {
          var _played = shouldResume && playEmbed(el);
          results.push({
            element: el,
            result: _played ? "restored:playing" : "noop:not-detached"
          });
          continue;
        }
        delete el.dataset.autopauseSrc;
        el.setAttribute("src", shouldResume ? src : stripAutoplay(src));
        results.push({
          element: el,
          result: "restored:reattached"
        });
        continue;
      }
      if (!shouldResume) {
        results.push({
          element: el,
          result: "noop:left-paused"
        });
        continue;
      }

      // play() rejects with NotAllowedError when autoplay policy blocks it, and
      // with AbortError if something pauses it again before the promise settles.
      // Neither is actionable here, but an unhandled rejection is noisy.
      var played = el.play();
      if (played && typeof played["catch"] === "function") played["catch"](function () {});
      results.push({
        element: el,
        result: "restored:playing"
      });
    }
  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }
  return results;
}

/**
 * Add enablejsapi=1 to YouTube embeds so they can be paused without a teardown,
 * and start watching provider iframes for readiness. Rewriting src reloads the
 * iframe, so this has to run before anything can be playing.
 */
function prepareMedia() {
  var root = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
  var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    _ref2$deep = _ref2.deep,
    deep = _ref2$deep === void 0 ? true : _ref2$deep;
  var _iterator5 = _createForOfIteratorHelper(collectMedia(root, deep)),
    _step5;
  try {
    for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
      var el = _step5.value;
      if (el.tagName.toLowerCase() !== "iframe") continue;
      var url = iframeUrl(el);
      if (!url) continue;
      var youtube = YOUTUBE_HOSTS.has(url.hostname);
      if (!youtube && !VIMEO_HOSTS.has(url.hostname)) continue;
      trackReadiness(el);
      if (el.dataset.autopausePrepared === "true") continue;
      el.dataset.autopausePrepared = "true";
      if (!youtube) continue;
      if (url.searchParams.get("enablejsapi") === "1") continue;
      url.searchParams.set("enablejsapi", "1");
      // YouTube uses this to validate the postMessage sender.
      url.searchParams.set("origin", window.location.origin);
      el.setAttribute("src", url.href);
    }
  } catch (err) {
    _iterator5.e(err);
  } finally {
    _iterator5.f();
  }
}

export { DisclosureGroup as D, MediaQueryController as M, SizeBreakpointMd as S, Disclosure as a, SizeBreakpointLg as b, prepareMedia as c, pauseMedia as p, restoreMedia as r, styles as s };
