import { accountSteps } from './account';
import { assessmentSteps } from './assessments';
import { assessmentResultsSteps } from './results';

const integrationSteps = [...accountSteps, ...assessmentSteps, ...assessmentResultsSteps];

export { integrationSteps };
