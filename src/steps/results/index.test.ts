import { executeStepWithDependencies } from '@jupiterone/integration-sdk-testing';
import { buildStepTestConfigForStep } from '../../../test/config';
import { Recording, setupProjectRecording } from '../../../test/recording';
import { Steps } from '../constants';

// See test/README.md for details
let recording: Recording;
afterEach(async () => {
  await recording.stop();
});


test('fetch-assessment-results', async () => {
  recording = setupProjectRecording({
    directory: __dirname,
    name: 'fetch-assessment-results',
  });

  const stepConfig = buildStepTestConfigForStep(Steps.ASSESSMENTRESULTS);
  const stepResult = await executeStepWithDependencies(stepConfig);
  expect(stepResult).toMatchStepMetadata(stepConfig);
});

test('build-assessment-results-relationships', async () => {
  recording = setupProjectRecording({
    directory: __dirname,
    name: 'build-assessment-results-relationships',
  });

  const stepConfig = buildStepTestConfigForStep(Steps.ASSESSMENT_RESULTS_RELATIONSHIPS);
  const stepResult = await executeStepWithDependencies(stepConfig);
  expect(stepResult).toMatchStepMetadata(stepConfig);
});
