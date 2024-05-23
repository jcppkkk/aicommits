import { execSync } from 'child_process';
import path from 'path';

function executeCommand(command) {
    return execSync(command).toString().trim();
}

const remoteUrl = executeCommand('git config --get remote.origin.url');
const branchName = executeCommand('git rev-parse --abbrev-ref HEAD');

const urlParts = remoteUrl.split('/');
const projectName = path.basename(urlParts[urlParts.length - 1], '.git');
const userName = urlParts[urlParts.length - 2].split(':')[1];

console.log(`Username: ${userName}, Project: ${projectName}, Branch: ${branchName}`);

executeCommand('git push');
executeCommand('pnpm dlx git-publish');
executeCommand(`npm -g --loglevel silly i '${userName}/${projectName}#npm/${branchName}'`);
