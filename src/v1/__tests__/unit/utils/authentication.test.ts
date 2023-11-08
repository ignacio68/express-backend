import { authentication, random } from '../../../../utils/authentication';

describe('test utils/helpers', () => {
	describe('authentication helper', () => {
		test('should must response a string', () => {
			const result = authentication('a', 'a');
			expect(result).toBeDefined();
		});
	});

	describe('random helper', () => {
		test('should must response a string', () => {
			const result = random();
			expect(result).toBeDefined();
		});
	});
});
