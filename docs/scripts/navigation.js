import {createFilter} from "twing";
import {findNavigationEntries, findBreadcrumbEntries} from "@11ty/eleventy-navigation/eleventy-navigation.js";

const navigationFilter = createFilter(
  "eleventyNavigation",
  (context, nodes, key) => {
    let collection = nodes;

    // 1. normalize the collection to a standard Array
    if (collection && typeof collection.values === "function") {
      collection = Array.from(collection.values());
    } else if (collection && typeof collection === "object" && !Array.isArray(collection)) {
      collection = Object.values(collection);
    }

    // 2. Safety Net
    if (!Array.isArray(collection)) {
      return Promise.resolve([]);
    }

    // Helper to safely get value from Map or Object
    const getVal = (item, prop) => {
      if (!item) return undefined;
      let val;
      if (typeof item.get === "function") {
        val = item.get(prop);
      }
      if (val === undefined) {
        val = item[prop];
      }
      return val;
    };

    // 4. Unwrap items for the plugin
    // We only need specific fields. recursing into everything is dangerous (circular refs).
    const cleanCollection = collection
      .map(item => {
        const url = getVal(item, "url");
        const rawData = getVal(item, "data");

        // We need to ensure 'data' is a plain object so the plugin can access data.eleventyNavigation
        let cleanData = rawData;
        if (cleanData && typeof cleanData.entries === "function") {
          const dataObj = Object.fromEntries(cleanData.entries());
          if (dataObj.eleventyNavigation && typeof dataObj.eleventyNavigation.entries === "function") {
            dataObj.eleventyNavigation = Object.fromEntries(dataObj.eleventyNavigation.entries());
          }
          cleanData = dataObj;
        }

        // Sanitize data to remove circular references
        // if (cleanData) {
        //   const {collections, eleventy, pkg, page, ...rest} = cleanData;
        //   cleanData = rest;
        // }

        if (!url || !cleanData) return null;

        return {
          url: url,
          data: cleanData,
        };
      })
      .filter(Boolean);

    // 5. Ensure Key is a String
    if (typeof key !== "string") key = "";

    // 6. Run the plugin and return Promise
    const result = findNavigationEntries(cleanCollection, key);
    return Promise.resolve(result);
  },
  [
    {name: "nodes", defaultValue: null},
    {name: "key", defaultValue: null},
  ],
  {needs_context: true},
);

export {navigationFilter};
