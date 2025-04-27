
describe('Run Functionality', () => {
    let originalApiKey;
  
    beforeAll(() => {
      // Save the real API key before tests
      originalApiKey = process.env.VITE_GEMINI_API_KEY;
    });
  
    afterAll(() => {
      // Restore the real API key after tests
      process.env.VITE_GEMINI_API_KEY = originalApiKey;
    });
  
    it('should run without throwing errors (when API key is present)', async () => {
      const { run } = require('./index.js');
      await expect(run()).resolves.not.toThrow();
    });
  
    it('should handle missing API key gracefully', async () => {
        delete process.env.VITE_GEMINI_API_KEY; // <-- true removal!
      
        const mockExit = vi.spyOn(process, 'exit').mockImplementation(() => { throw new Error('EXIT'); });
        const mockConsoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
      
        const { run } = require('./index.js');
    
        try {
          await run();
        } catch (err) {
          expect(err.message).toBe('EXIT');
        }
      
        expect(mockConsoleError).toHaveBeenCalledWith('Error: API Key not found.');
      
        mockExit.mockRestore();
        mockConsoleError.mockRestore();
      });      
  });
  