class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  isNormalItem(item) {
    return item.name !== "Aged Brie" && item.name !== "Backstage passes" && item.name !== "Sulfuras" && item.name !== "Conjured";
  }

  updateNormalItemQuality(item) {
    if (item.quality > 0) {
      item.quality = item.quality - 1;
    }
  }

  isConjured(item) {
    return item.name === "Conjured";
  }

  updateConjuredQuality(item) {
    this.updateNormalItemQuality(item);
    this.updateNormalItemQuality(item);
  }

  updateSpecialItemQuality(item) {
    if (item.quality < 50) {
      item.quality = item.quality + 1;
    }
  }

  isAgedBrie(item) {
    return item.name === "Aged Brie";
  }

  isBackstagePass(item) {
    return item.name === "Backstage passes";
  }

  updateAgedBrieQuality(item) {
    this.updateSpecialItemQuality(item);
  }

  updateBackstagePassQuality(item) {
    if (item.sellIn < 0) {
      item.quality = 0;
      return;
    }
    this.updateSpecialItemQuality(item);
    if (item.sellIn < 11) {
      this.updateSpecialItemQuality(item);
    }
    if (item.sellIn < 6) {
      this.updateSpecialItemQuality(item);
    }
  }

  updateSellIn(item) {
    if (item.name !== "Sulfuras") {
      item.sellIn = item.sellIn - 1;
    }
  }

  differentItemsUpdate(item) {
    if (this.isNormalItem(item)) {
      this.updateNormalItemQuality(item);
    }
    if (this.isAgedBrie(item)) {
      this.updateAgedBrieQuality(item);
    }
    if (this.isBackstagePass(item)) {
      this.updateBackstagePassQuality(item);
    }
    if (this.isConjured(item)) {
      this.updateConjuredQuality(item);
    }
  }

  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      this.differentItemsUpdate(this.items[i]);
      this.updateSellIn(this.items[i]);
      if (this.items[i].sellIn < 0) {
        this.differentItemsUpdate(this.items[i]);
      }
    }
    return this.items;
  }
}

module.exports = {
  Item,
  Shop,
};