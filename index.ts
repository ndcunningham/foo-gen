import { Tree, addDependenciesToPackageJson, formatFiles, joinPathFragments, getWorkspaceLayout, generateFiles, normalizePath, names } from "@nrwl/devkit";
import { Schema } from "./schema";

export async function newGenerator(tree: Tree, schema: Schema) {

  const { appsDir } = getWorkspaceLayout(tree);
  const appProjectRoot = normalizePath(`${appsDir}/${names(schema.name).fileName}`);

  const install = updateDependencies(tree);
  await install();

  generateFiles(tree, joinPathFragments(__dirname, './stuff'), appProjectRoot, {});

  await formatFiles(tree);

  return async () => {
    await install();
  }
}

function updateDependencies(tree: Tree) {
  return addDependenciesToPackageJson(
    tree,
    {
      'react': 'latest',
      'react-dom': 'latest'
    },
    {}
  );
}