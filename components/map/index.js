import WebComponent from "../../scripts/WebComponent/WebComponent.js";
import slugify from "../../scripts/utilities/slugify.js";
import styles from "./style.css";
import {pin, pinSelected, mapStyles} from "./style.js";

export default class Map extends WebComponent(HTMLElement) {
  static props = {
    zoom: {
      type: Number,
      default: 10,
    },
  };

  constructor() {
    super();
    this.shadowRoot.adoptedStyleSheets = [styles];
  }

  connectedCallback() {
    if(this.dataset.locations) {
      try {
        this.data = JSON.parse(this.dataset.locations);
      } catch(error) {
        console.log(error);
      }
    }

    this.markers = [];
  }

  render() {
    const {tags, locations} = this.data;

    return /* html */`
      <div part="map-view">
        <menu>
          ${tags.map(tag => /* html */`
            <li>
              <button id="${slugify(tag)}-button" aria-pressed="${this.state.selectedTag === tag}" onclick="this.getRootNode().host.tagButtonClick(event)">${tag}</button>
            </li>
          `).join("")}
        </menu>
        <static-slot part="map"></static-slot>
      </div>
      <div part="card-view">
        ${locations.map((location) => /* html */`
          <tcds-card
            part="card"
            id="location-${location.id}"
            variant="ui"
            ${location.id !== this.state.activeLocation ? "hidden" : ""}
          >
            ${location.image_desktop && location.image_desktop.length > 2 ? /* html */`
              <img slot="image" src="${location.image_desktop}">
            ` : ``}
            ${location.type ? /* html */`
              <p slot="subtitle">${location.type}</p>
            ` : ``}
            <a slot="title" href="${location.link}">${location.title}</a>
            <p slot="description">
              ${location.address_line1}<br>
              ${location.address_line2 ? `${location.address_line2}<br>` : ""}
              ${location.locality}, ${location.administrative_area} ${location.postal_code}
            </p>
            <footer slot="footer" class="column">
              <tcds-button icon="chevron-right right" variant="ghost" link="${location.link}">
                Hours &amp; information
              </tcds-button>

              ${location.actions ? /* html */`
                <ul class="tcds-action-bar tcds-action-bar--small">
                  ${location.actions.map((action) => /* html */`
                    <li>
                      <a href="${action.link_url}">
                        <tcds-icon icon="${action.link_icon}"></tcds-icon>
                        ${action.link_content}
                      </a>
                    </li>
                  `).join("")}
                </ul>
              ` : ""}
            </footer>
          </tcds-card>
        `).join("")}
      </div>
    `;
  }


  mountedCallback() {
    const {locations} = this.data;

    const defaultLocation =
      locations.find(location => location.featured && location.area === this.props["default-area"])
      || locations.find(location => location.featured)
      || locations[0];

    locations.sort((a, b) => {
      if(a === defaultLocation) {
        return -1;
      }

      if(a.featured && !b.featured) {
        return -1;
      }

      if(b.featured && !a.featured) {
        return 1;
      }

      return 0;
    });

    this.map = new window.google.maps.Map(this.parts["map"], {
      zoom: this.props.zoom,
      center: {
        lat: defaultLocation.lat,
        lng: defaultLocation.lng,
      },
      disableDefaultUI: true,
      zoomControl: true,
      streetViewControl: false,
      styles: mapStyles,
    });

    locations.forEach((location, index) => {
      const {map} = this;

      const marker = new window.google.maps.Marker({
        position: {
          lat: location.lat,
          lng: location.lng,
        },
        map,
        title: `${index + 1}. ${location.title}`,
        optimized: false,
        icon: pin,
        zIndex: location === defaultLocation ? 1000 : 0,
      });

      marker.location = location;
      this.markers.push(marker);

      if(location === defaultLocation) {
        marker.setIcon(pinSelected);
        this.switchLocation(marker);
      }

      marker.addListener("click", () => {
        if(this.state.selectedLocation !== location) {
          this.switchLocation(marker);
        }
      });
    });

    // Google Maps tries to inject inline styles to the head of the map
    // container's root node for the UI controls. However, in this case the root
    // node is the component's shadow root, meaning the style tags get wiped out
    // on re-render because they're not present in the declared template. So, we
    // dumped those styles in the style.css sheet. We also need to remove the
    // style tags as soon as they're added by the Google Maps script, as there
    // is a noticeable FOUC on first re-render. We're using a MutationObserver
    // to detect when style tags are added, then remove them.
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        const addedStyleTags = [...mutation.addedNodes].filter((node) => {
          return node.nodeName.toLowerCase() === "style" && node.id !== "tcds";
        });

        if(addedStyleTags.length === 0) {
          return;
        }

        removeStylesPreviousTo(this.shadowRoot.querySelector("style[id=tcds]"));
      });
    });

    function removeStylesPreviousTo(node) {
      if(!node || !node.previousSibling || node.previousSibling.nodeName.toLowerCase() !== "style") {
        return;
      }

      node.previousSibling.remove();
      removeStylesPreviousTo(node);
    }

    observer.observe(this.shadowRoot, {childList: true});
  }

  updatedCallback(state) {
    if(state.newState) {
      this.parts["card"].forEach(card => card.orient());

      if("selectedTag" in state.newState) {
        const {locations} = this.data;
        const {selectedTag} = this.state;

        const areaDefaultLocation =
          locations.find(location => location.featured && location.area === selectedTag)
          || locations.find(location => location.area === selectedTag);

        let defaultMarker = null;

        this.markers.forEach((marker) => {
          marker.setMap(marker.location.area === selectedTag ? this.map : null);

          if(!defaultMarker && marker.location.area === selectedTag) {
            defaultMarker = marker;
            marker.setZIndex(1000);
          }
        });

        this.switchLocation(defaultMarker);

        this.map.setCenter({
          lat: areaDefaultLocation.lat,
          lng: areaDefaultLocation.lng,
        });
      }
    }
  }

  tagButtonClick(event) {
    if(this.state.selectedTag === event.target.textContent) {
      this.map.setZoom(this.props.zoom);
      this.markers.forEach((marker) => {
        marker.setMap(this.map);
      });
    } else {
      this.state.selectedTag = event.target.textContent;
    }
  }

  switchLocation(marker) {
    this.markers.forEach((marker) => {
      marker.setIcon(pin);
    });

    marker.setIcon(pinSelected);

    this.state.activeLocation = marker.location.id;
  }
}

window.initMap = () => {
  customElements.define("tcds-map", Map);
};
