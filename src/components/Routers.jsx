export function parseRoute(hash) {
  const cleanHash = hash.replace(/^#\/?|\/$/g, ""); // remove "#", leading and trailing slashes
  const parts = cleanHash.split("/");

  if (parts[0] === "add") return { page: "add" };
  if (parts[0] === "edit" && parts[1]) return { page: "edit", id: Number(parts[1]) };

  return { page: "home" };
}

export function navigateTo(path) {
  window.location.hash = path;
}
