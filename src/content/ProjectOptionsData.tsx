
import { PublicKey } from '@solana/web3.js';
import { Project, ProjectOptions } from '../types';
import optionAccountsData from './OptionAccountsData';
import projectList from './projectList';

const projectOptionsData: ProjectOptions[] = [
    {
        project: projectList[0],
        options: optionAccountsData.slice(0,4),
    },
    {
        project: projectList[1],
        options: optionAccountsData.slice(4)
    }
];

export default projectOptionsData;