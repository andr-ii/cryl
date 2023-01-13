/**
 * @author Andrii Lytovchenko <andr.lyt.dev@gmail.com>
 * @license MIT
 */

import * as fs from 'fs';
import { PATH_TO_HELP_FILE } from './constants';

export const readHelpFile = () =>
  new Promise((resolve) => {
    const stream = fs.createReadStream(PATH_TO_HELP_FILE);

    stream.on('data', (chunk) => {
      console.log(chunk.toString());
    });

    stream.on('end', () => {
      resolve(null);
    });
  });
