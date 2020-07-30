const prompts = require('prompts');
const fs = require('fs');
const conf = require('./config.json');

const createTemplates = (fileName) => {
  const component = `import React from 'react';

  import './${fileName}.scss';
  
  const ${fileName} = () => {
    return (
      <div>
        <p>${fileName} component</p>
      </div>
    );
  };
  
  export default ${fileName};
  `;

  const story = `import React from 'react'
  import ${fileName} from './';
  
  export default {
    title: '${fileName}',
    components: ${fileName}
  }
  
  export const Story${fileName} = () => {
    return <${fileName} />;
  }
  `;

  const index = `export {default} from './${fileName}.component';`;

  return {
    component: component,
    story: story,
    index: index,
  };
};

const questions = [
  {
    type: 'text',
    name: 'folderName',
    message: 'component folder name ?',
  },
  {
    type: 'text',
    name: 'fileName',
    message: 'component file name?',
  },
];

(async () => {
  try {
    const { folderName, fileName } = await prompts(questions);
    if (folderName === undefined || fileName === undefined) return false;

    const folderPath = conf.folders.components + folderName;

    const exist = await fs.existsSync(folderPath);
    if (exist) {
      console.log(`Component ${folderName} already exist`);
      return false;
    }
    await fs.mkdirSync(folderPath, { recursive: true });

    const { component, story, index } = createTemplates(fileName);

    await fs.writeFileSync(
      `${folderPath}/${fileName}.component.jsx`,
      component,
    );
    await fs.writeFileSync(`${folderPath}/${fileName}.scss`, '');
    await fs.writeFileSync(`${folderPath}/${fileName}.stories.js`, story);
    await fs.writeFileSync(`${folderPath}/index.js`, index);
  } catch (e) {
    console.log(e.message);
  }
})();
