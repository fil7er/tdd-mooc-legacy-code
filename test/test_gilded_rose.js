var { expect } = require("chai");
var { Shop, Item } = require("../src/gilded_rose.js");

describe("Gilded Rose", function () {
  it("should foo", function () {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality(); 
    expect(items[0].name).to.equal("foo");
  });
});

describe("Tests Basic items", function () {
  it("Decrease sell by 1", function () {
    const gildedRose = new Shop([new Item("Basic item", 10, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(9);
  });

  it("Decrease quality by 2 if sellIn is 0", function () {
    const gildedRose = new Shop([new Item("Basic item", 0, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(8);
  });

  it("Decrease quality by 1 if sellIn is > 0", function () {
    const gildedRose = new Shop([new Item("Basic item", 1, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(9);
  });

  it("Quality is not negative even if sellIn is negative", function () {
    const gildedRose = new Shop([new Item("Basic item", -5, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
  });

  it("Decrease quality by 2 if sellIn is negative", function () {
    const gildedRose = new Shop([new Item("Basic item", -1, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(8);
  });

  it("Quality of item decreases even if quality of another item is 0", function () {
    const gildedRose = new Shop([new Item("Basic item", 1, 10), new Item("Basic item", 1, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(9);
    expect(items[1].quality).to.equal(0);
  });
});

describe("Aged Brie Tests", function () {
  it("Increase quality by 1 if sellIn is >= 0", function () {
    const gildedRose = new Shop([new Item("Aged Brie", 1, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(11);
  });

  it("Increase quality by 2 if sellIn is < 0", function () {
    const gildedRose = new Shop([new Item("Aged Brie", 0, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(12);
  });

  it("Quality never be greater than 50", function () {
    const gildedRose = new Shop([new Item("Aged Brie", 1, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(50);
  });

  it("Quality never be greater than 50 even if sellIn is negative", function () {
    const gildedRose = new Shop([new Item("Aged Brie", -5, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(50);
  });
});

describe("Sulfuras Test", function () {
  it("Nerver change quality", function () {
    const gildedRose = new Shop([new Item("Sulfuras", 1, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(80);
  });

  it("Never sell", function () {
    const gildedRose = new Shop([new Item("Sulfuras", 1, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(1);
  });

  it("Never change quality, even negative sell", function () {
    const gildedRose = new Shop([new Item("Sulfuras", -1, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(80);
  });
});

describe("Backstage passes Tests", function () {
  it("Increase quality by 1 when sellIn is > 10", function () {
    const gildedRose = new Shop([new Item("Backstage passes", 15, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(11);
  });

  it("Increase quality by 2 when 5 < sellIn <= 10", function () {
    const gildedRose = new Shop([new Item("Backstage passes", 8, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(12);
  });

  it("Increase quality by 3 when 0 < sellIn <= 5", function () {
    const gildedRose = new Shop([new Item("Backstage passes", 5, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(13);
  });

  it("Quality can´t be greater than 50 if it's already 50", function () {
    const gildedRose = new Shop([new Item("Backstage passes", 1, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(50);
  });

  it("quality drops to 0 when sellIn is < 0", function () {
    const gildedRose = new Shop([new Item("Backstage passes", -1, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
  });

  it("Quality can´t be greater than 50 when 0 < sellIn <= 5", function () {
    const gildedRose = new Shop([new Item("Backstage passes", 3, 49)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(50);
  });

  it("Quality can´t be greater than 50 when 5 < sellIn <= 10", function () {
    const gildedRose = new Shop([new Item("Backstage passes", 8, 49)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(50);
  });


  it("Quality increase many times when update is called many times", function () {
    const gildedRose = new Shop([new Item("Backstage passes", 11, 10)]);
    let items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(11);
    items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(13);
    items = gildedRose.updateQuality();
    items = gildedRose.updateQuality();
    items = gildedRose.updateQuality();
    items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(21);
  });

  it("Quality increase many times when update is called many times and drop if sellIn is negative", function () {
    const gildedRose = new Shop([new Item("Backstage passes", 6, 10)]);
    let items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(12);
    items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(15);
    items = gildedRose.updateQuality();
    items = gildedRose.updateQuality();
    items = gildedRose.updateQuality();
    items = gildedRose.updateQuality();
    items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
  });
});

it("Quality can´t be greater than 50 when sellIn > 10", function () {
  const gildedRose = new Shop([new Item("Backstage passes", 15, 50)]);
  const items = gildedRose.updateQuality();
  expect(items[0].quality).to.equal(50);
});

describe("Test Shop", function () {
  it("Return array of items", function () {
    const gildedRose = new Shop([new Item("Basic item", 1, 10)]);
    const items = gildedRose.updateQuality();
    expect(items).to.be.an("array");
  });

  it("No parameters should return an empty array", function () {
    const gildedRose = new Shop();
    const items = gildedRose.updateQuality();
    expect(items).to.be.an("array");
    expect(items.length).to.equal(0);
  });
});

describe("Test for conjured items", function () {
  it("Decrease quality by 2 when sellIn is > 0", function () {
    const gildedRose = new Shop([new Item("Conjured", 1, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(8);
  });

  it("Decrease quality by 4 when sellIn is <= 0", function () {
    const gildedRose = new Shop([new Item("Conjured", -1, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(6);
  });

  it("Quality can´t be less than 0", function () {
    const gildedRose = new Shop([new Item("Conjured", 1, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
  });

  it("Quality can´t be less than 0 when sellIn is <= 0", function () {
    const gildedRose = new Shop([new Item("Conjured", -1, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
  });
});
