import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = () => {
  const modules = import.meta.glob('/src/routes/lessons/*/+page.svelte');

  const paths = Object.keys(modules);
  const routes = paths.map(path => {
    path = path.replace('/+page.svelte', '')
    const name = path.split('/').pop();
    const href = path.replace('/src/routes/', '')
    return { name, href }
  });

  return { 
    routes
  };
}