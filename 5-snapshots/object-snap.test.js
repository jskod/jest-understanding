describe('Object snapshot', () => {
  
  // Below code block will only check the snapshot structure but will accept
  // any date and id and will pass the test if snapshot is matched.
  
  it('will check the matchers and pass', () => {
    const user = {
      createdAt: new Date(),
      id: Math.floor(Math.random() * 20),
      name: 'LeBron James',
    };
  
    expect(user).toMatchSnapshot({
      createdAt: expect.any(Date),
      id: expect.any(Number),
    });
  });

  // Uncomment below code block and run the test
  // First run will save a snapshot and pass the test
  // But next runs will always fail because of createAt and id properties.

  /*
  it('will fail every time', () => {
    const user = {
      createdAt: new Date(),
      id: Math.floor(Math.random() * 20),
      name: 'LeBron James',
    };
  
    expect(user).toMatchSnapshot();
  });
  */

});