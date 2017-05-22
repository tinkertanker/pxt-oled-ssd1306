for PXT/microbit

# SSD1306 OLED PXT Package

This is the PXT Package for SSD1306 OLED controller, based on the Adafruit Arduino library available [here](https://github.com/adafruit/Adafruit_SSD1306).

## Hardware Setup
1. Insert the OLED display into the I2C ports on the break out board.

## PXT Blocks
### Initialize OLED Display
Initialize OLED display with height and width of the OLED display (Eg: 64 by 128).
Shows TinkerTanker splash screen after initializing.

### Initialize OLED Display for 'Text Output'
Initialize OLED display.
Clears the screen and sets the cursor to (0, 0) to print text inputs.
Able to use 'show string' and 'show number' below.
In text output mode, wrapping is enabled.
If text exceeds number of lines supported, the lines will 'shift up', like in terminal.

### Show String
Prints string to OLED, at cursor location.
Requires OLED to be initialized for text display.

### Show Number
Prints number to OLED, at cursor location.
Requires OLED to be initialized for text display.

## Example: Counter
The following code is a simple counter that displays an increasing number every second.

```
OLED.initTerminal(64, 128);
let count = 0;
while (true) {
    count += 1
    OLED.showNumber(count)
    basic.pause(1000)
}
```

## Footnotes
1.  Datasheet
https://cdn-shop.adafruit.com/datasheets/SSD1306.pdf