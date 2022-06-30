import { accountSteps } from './account';
import { assessmentSteps } from './assessments';

const integrationSteps = [...accountSteps, ...assessmentSteps];

export { integrationSteps };
