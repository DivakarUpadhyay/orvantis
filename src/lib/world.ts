// Markets we currently serve. Forms and the partner programme only offer these.
export const worldRegions = [
  { id: "india", name: "India", areas: ["Maharashtra", "Karnataka", "Delhi NCR", "Tamil Nadu", "Telangana", "Gujarat", "Pune", "Mumbai"] },
  { id: "taiwan", name: "Taiwan", areas: ["Taipei", "New Taipei", "Hsinchu", "Taoyuan", "Taichung", "Tainan", "Kaohsiung"] },
] as const;

export const countries: string[] = worldRegions.map((r) => r.name);
