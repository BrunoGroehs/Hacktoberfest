import fs from "fs";
import path from "path";

describe("App routes uniqueness", () => {
  it("defines unique route paths in App.jsx", () => {
    const appPath = path.join(process.cwd(), "src", "App.jsx");
    const src = fs.readFileSync(appPath, "utf8");

    // Extract all Route path="..." attributes
    const routeRegex = /<Route\s+[^>]*\bpath\s*=\s*["']([^"']+)["']/g;
    const rawPaths = [];
    let match;
    while ((match = routeRegex.exec(src)) !== null) {
      rawPaths.push(match[1]);
    }

    // Normalize paths: remove trailing slashes (except for root "/")
    const normalize = (p) => {
      if (p === "/") return "/";
      return p.replace(/\/+$/, "");
    };

    const paths = rawPaths.map(normalize);

    // Expect uniqueness
    const unique = new Set(paths);
    const hasDuplicates = unique.size !== paths.length;

    if (hasDuplicates) {
      // List duplicates for easier debugging
      const seen = new Set();
      const duplicates = paths.filter((p) => {
        if (seen.has(p)) return true;
        seen.add(p);
        return false;
      });
      throw new Error(
        `Duplicate route paths detected in App.jsx: ${Array.from(
          new Set(duplicates)
        ).join(", ")}`
      );
    }

    expect(unique.size).toBe(paths.length);
  });
});
