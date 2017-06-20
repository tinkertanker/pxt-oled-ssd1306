# SSD1306 OLED PXT Package [![Build Status](https://travis-ci.org/Tinkertanker/pxt-ssd1306-microbit.svg?branch=master)](https://travis-ci.org/Tinkertanker/pxt-ssd1306-microbit)

This is the PXT Package for SSD1306 OLED controller, based on the Adafruit Arduino library available [here](https://github.com/adafruit/Adafruit_SSD1306).

## Hardware Setup
1. Insert the OLED display into the I2C ports on the break out board.

## PXT Blocks
### Initialize OLED Display
Initializes the OLED display.

Sets up the OLED display and prepares it for use by the micro:bit.

```sig
OLED.init(64, 128);
```

This block must be placed before any of the ``show`` blocks.


### Show String
Displays a string on the OLED module.

```sig
OLED.showString("hello, micro:bit!")
```

The ``init`` block must be placed before this.


### Show Number
Displays a number on the OLED module.

```sig
OLED.showNumber(123)
```

The ``init`` block must be placed before this.


### Clear Display
Clears the display.

```sig
OLED.clearDisplay()

The ``init`` block must be placed before this.

## Example: Counter
The following code is a simple counter that displays an increasing number every second.

```blocks
OLED.init(64, 128)
let item = 0
basic.forever(() => {
    basic.pause(1000)
    item += 1
    OLED.showNumber(item)
})
```

## Supported targets

* for PXT/microbit

## Footnotes

1.  Datasheet https://cdn-shop.adafruit.com/datasheets/SSD1306.pdf