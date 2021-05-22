# Lab8_Starter

## Check your understanding q's (FILL OUT)
1. In your own words: Where would you fit your automated tests in your Bujo project development pipeline? (just write the letter)

1

2. Would you use a unit test to test the “message” feature of a messaging application? Why or why not? For this question, assume the “message” feature allows a user to write and send a message to another user.

No. I would not use a unit test to test the "message" feature of such an app because this feature is not a standalone feather and seems to depend on other parts of the application.

3. Would you use a unit test to test the “max message length” feature of a messaging application? Why or why not? For this question, assume the “max message length” feature prevents the user from typing more than 80 characters

Yes. I would use a unit test to test "max message length" because the maximum length of a given message does not depend on other features of the application and thus can be tested individually using a unit test.

4. What do you expect to happen if we run our puppeteer tests with the field “headless” set to true?

I would expect the browser to not show up when running the puppeteer tests.

5. What would your beforeAll callback look like if you wanted to start from the settings page before every test case?

await page.click('[alt=settings]');

