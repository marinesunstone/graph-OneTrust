import { accountSteps } from './account';
import { assessmentSteps } from './assessments';
import { assessmentResultsSteps } from './assessments/results';

const integrationSteps = [...accountSteps, ...assessmentSteps, ...assessmentResultsSteps];

export { integrationSteps };
