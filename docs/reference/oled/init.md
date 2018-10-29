# initialise OLED

Sets up the OLED display and prepares it for use by the micro:bit.

```sig
OLED.init(64, 128);
```

This block must be placed before any of the ``show`` blocks.

## Parameters

* **height**: the height (in pixels) of the OLED module
* **width**: the width (in pixels) of the OLED module

## Example

```blocks
OLED.init(64, 128)
OLED.showNumber(123)
```

# See also
[``||showNumber||``](/reference/oled/showNumber),[``||showString||``](/reference/oled/showString)