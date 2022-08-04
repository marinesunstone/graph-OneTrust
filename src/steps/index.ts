import { accountSteps } from './account';
import { assessmentSteps } from './assessments';
import { vendorSteps } from './vendors';
import { assessmentResultsSteps } from './results';

const integrationSteps = [...accountSteps, ...assessmentSteps, ...vendorSteps];

export { integrationSteps };
