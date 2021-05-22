describe('Basic user flow for SPA ', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500');
    await page.waitForTimeout(500);
  });

  // test 1 is given
  it('Test1: Initial Home Page - Check for 10 Journal Entries', async () => {
    const numEntries = await page.$$eval('journal-entry', (entries) => {
      return entries.length;
    });
    expect(numEntries).toBe(10);
  });

  // test 2 is given
  it('Test2: Make sure <journal-entry> elements are populated', async () => {
    let allArePopulated = true;
    let data, plainValue;
    const entries = await page.$$('journal-entry');
    for (let i = 0; i < entries.length; i++) {
      data = await entries[i].getProperty('entry');
      plainValue = await data.jsonValue();
      if (plainValue.title.length == 0) { allArePopulated = false; }
      if (plainValue.date.length == 0) { allArePopulated = false; }
      if (plainValue.content.length == 0) { allArePopulated = false; }
    }
    expect(allArePopulated).toBe(true);
  }, 30000);


  it('Test3: Clicking first <journal-entry>, new URL should contain /#entry1', async () => {
    // implement test3: Clicking on the first journal entry should update the URL to contain “/#entry1”
    let url;
    await page.click('journal-entry');
    url =  await page.url();
    expect(url).toBe('http://127.0.0.1:5500/#entry1');
  });

  it('Test4: On first Entry page - checking page header title', async () => {
    // implement test4: Clicking on the first journal entry should update the header text to “Entry 1”
    let title, h1, b;
    h1 = await page.$('header > h1');
    b = await h1.getProperty('innerText');
    title = await b.jsonValue();
    expect(title).toBe('Entry 1');
  });

  it('Test5: On first Entry page - checking <entry-page> contents', async () => {
    /*
     implement test5: Clicking on the first journal entry should contain the following contents:
        { 
          title: 'You like jazz?',
          date: '4/25/2021',
          content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
          image: {
            src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
            alt: 'bee with sunglasses'
          }
        }
      */
    let entry1, title, date, content, image, entry, b;
    entry1 = await page.$('journal-entry');
    entry = await entry1.getProperty('entry');
    b = await entry.jsonValue();
    date = b.date;
    title = b.title;
    content = b.content;
    image = b.image;
    expect(title).toBe('You like jazz?');
    expect(date).toBe('4/25/2021');;
    expect(content).toBe("According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.");
    expect(image.src).toBe('https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455');
    expect(image.alt).toBe('bee with sunglasses');
  }, 10000);

  it('Test6: On first Entry page - checking <body> element classes', async () => {
    // implement test6: Clicking on the first journal entry should update the class attribute of <body> to ‘single-entry’
    let bodyClass, b, body;
    body = await page.$('body');
    b = await body.getProperty('className');
    bodyClass = await b.jsonValue();
    expect(bodyClass).toBe('single-entry');
  });

  it('Test7: Clicking the settings icon, new URL should contain #settings', async () => {
    // implement test7: Clicking on the settings icon should update the URL to contain “/#settings”
    let url;
    await page.click('[alt=settings]');
    url = await page.url();
    expect(url).toBe('http://127.0.0.1:5500/#settings');
  });

  it('Test8: On Settings page - checking page header title', async () => {
    // implement test8: Clicking on the settings icon should update the header to be “Settings”
    let settings, h1, b;
    h1 = await page.$('header > h1');
    b = await h1.getProperty('innerText');
    settings = await b.jsonValue();
    expect(settings).toBe('Settings');
  });

  it('Test9: On Settings page - checking <body> element classes', async () => {
    // implement test9: Clicking on the settings icon should update the class attribute of <body> to ‘settings’
    let bodyClass, b, body;
    body = await page.$('body');
    b = await body.getProperty('className');
    bodyClass = await b.jsonValue();
    expect(bodyClass).toBe('settings');
  });

  it('Test10: Clicking the back button, new URL should be /#entry1', async() => {
    // implement test10: Clicking on the back button should update the URL to contain ‘/#entry1’
    let url;
    await page.goBack();
    url = await page.url();
    expect(url).toBe('http://127.0.0.1:5500/#entry1');
  });

  // define and implement test11: Clicking the back button once should bring the user back to the home page
  it('Test11: Clicking on the back button, url should be http://127.0.0.1:5500/', async() => {
    let url;
    await page.goBack();
    url = await page.url();
    expect(url).toBe('http://127.0.0.1:5500/');
  });


  // define and implement test12: When the user if on the homepage, the header title should be “Journal Entries”
  it('Test12: Homepage title should be "Journal Entries"', async() => {
    let title,h1,b;
    h1 = await page.$('header > h1');
    b = await h1.getProperty('innerText');
    title = await b.jsonValue();
    expect(title).toBe('Journal Entries');
  });


  // define and implement test13: On the home page the <body> element should not have any class attribute 
  it('Test13: Class attribute on home page should not exist', async() => {
    let body, b, noClass;
    body = await page.$('body');
    b = await body.getProperty('className');
    noClass = await b.jsonValue();
    expect(noClass).toBeFalsy();
  });

  // define and implement test14: Verify the url is correct when clicking on the second entry
  it('Test14: Clicking on second entry should give url /#entry2', async() => {
    let url;
    await page.click('journal-entry + journal-entry');
    url = await page.url();
    expect(url).toBe('http://127.0.0.1:5500/#entry2');
  });


  // define and implement test15: Verify the title is current when clicking on the second entry
  it('Test15: Clicking on second entry should give header title "Entry 2"', async() => {
    let title, h1, a;
    h1 = await page.$('header > h1');
    a = await h1.getProperty('innerText');
    title = await a.jsonValue();
    expect(title).toBe('Entry 2');
  });

  // define and implement test16: Verify the entry page contents is correct when clicking on the second entry\
  it('Test16: Clicking on second entry should give proper contents', async() => {
    let a, b, title, entry2, content, date, image;
    entry2 = await page.$('journal-entry + journal-entry');
    a = await entry2.getProperty('entry');
    b = await a.jsonValue();
    title = b.title;
    date = b.date;
    image = b.image;
    content = b.content;
    expect(title).toBe('Run, Forrest! Run!');
    expect(date).toBe('4/26/2021');
    expect(content).toBe("Mama always said life was like a box of chocolates. You never know what you're gonna get.");
    expect(image.src).toBe('https://s.abcnews.com/images/Entertainment/HT_forrest_gump_ml_140219_4x3_992.jpg');
    expect(image.alt).toBe('forrest running');
  });

  // create your own test 17
  it('Test17: Clicking back button then the forward button should give url /#entry2', async() => {
    let url;
    await page.goBack();
    await page.goForward();
    url = await page.url();
    expect(url).toBe('http://127.0.0.1:5500/#entry2');
  });

  // create your own test 18
  it('Test18: Check contents (including audio) of entry 4', async() => {
    let entryList, a, b, title, entry2, content, date, image, audio;
    entryList = await page.$$('journal-entry');
    a = await entryList[3].getProperty('entry');
    b = await a.jsonValue();
    title = b.title;
    date = b.date;
    image = b.image;
    content = b.content;
    audio = b.audio;
    expect(title).toBe("You're a wizard, Harry");
    expect(date).toBe('4/28/2021');
    expect(content).toBe("Hmm, difficult. VERY difficult. Plenty of courage, I see. Not a bad mind, either. There's talent, oh yes. And a thirst to prove yourself. But where to put you? Not Slytherin. Not Slytherin. Not Slytherin, eh? Are you sure? You could be great, you know. It's all here in your head. And Slytherin will help you on the way to greatness, there's no doubt about that. No? Please, please. Anything but Slytherin, anything but Slytherin. Well if you're sure, better be... GRYFFINDOR!");
    expect(image.src).toBe('https://w7w5t4b3.rocketcdn.me/wp-content/uploads/2019/01/harry-potter-sorting-hat-wrong.jpg');
    expect(image.alt).toBe('harry looking up at the sorting hat');
    expect(audio).toBe('https://drive.google.com/uc?export=download&id=1Orwnly-OMhNt83tb-SAWt6Y3S6AYQgkk');
  });

  // create your own test 19
  it('Test19: Check to see that you cannot go forward on most recent page', async() => {
    let forward = await page.goForward();
    let url = await page.url();
    expect(forward).toBeNull();
    expect(url).toBe('http://127.0.0.1:5500/#entry2');
  });

  // create your own test 20
  it('Test20: Check url is /#entry 4 when clicking on entry 4', async() => {
    let url;
    await page.goBack();
    await page.click('journal-entry:nth-child(4)');
    url = await page.url();
    expect(url).toBe('http://127.0.0.1:5500/#entry4');
  });
});
