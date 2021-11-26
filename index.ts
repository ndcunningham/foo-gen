import { Tree, addDependenciesToPackageJson, ProjectConfiguration, addProjectConfiguration, formatFiles } from "@nrwl/devkit";
import { createApplicationFiles } from "./create-application-files";
import { normalizeOptions } from "./normalize-options";
import { NormalizedSchema, Schema } from "./schema";

export async function newGenerator(tree: Tree, schema: Schema) {

  // const options = normalizeOptions(tree, schema);
  // createApplicationFiles(tree, options);
  // addProject(tree, options);
  const install = updateDependencies(tree);
  await install();

  // generateFiles(tree, joinPathFragments(__dirname, './stuff'), appProjectRoot, {});

  // await formatFiles(tree);

  // return async () => {
  //   await install();
  // }
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


export function addProject(host: Tree, options: NormalizedSchema) {
  const project: ProjectConfiguration = {
    root: options.appProjectRoot,
    sourceRoot: `${options.appProjectRoot}/src`,
    projectType: 'application',
  };

  addProjectConfiguration(
    host,
    options.projectName,
    {
      ...project,
    },
    options.standaloneConfig
  );
}

