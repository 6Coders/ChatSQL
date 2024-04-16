import router from '@/router';
import RedirectButton from '@/components/RedirectButton';

describe('RedirectButton', () => {
  it('should redirect to the specified path when clicked', () => {
    // Mock the router push method
    const routerPushMock = jest.fn();
    router.push = routerPushMock;

    // Define the paths to test
    const paths = ['/', '/manager', '/request'];

    // Iterate over the paths
    paths.forEach((path, index) => {
      // Create an instance of RedirectButton for each path
      const redirectButton = new RedirectButton(`Go to ${path}`, path, router);
      
      // Simulate a click on the button
      redirectButton.onClick();
      
      // Verify that router.push is called with the correct path
      expect(routerPushMock).toHaveBeenNthCalledWith(index + 1, path);
    });
  });
  it('should throw an error for an invalid path', () => {
    // Create an instance of RedirectButton with an invalid path
    const invalidPathButton = new RedirectButton("Invalid Path", "/invalid", router);

    // Verify that clicking the button throws an error
    expect(() => invalidPathButton.onClick()).toThrowError("Invalid path");
  });
});
