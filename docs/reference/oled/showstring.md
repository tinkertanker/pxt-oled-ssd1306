# show string on OLED

Displays a string on the OLED module.

```sig
OLED.showString("hello, micro:bit!")
```

The ``init`` block must be placed before this.

## Parameters

* **text**: the string to display.

## Example

```blocks
OLED.init(64, 128)
OLED.showString("hello, micro:bit!")
```

# See also
[``||init||``](/reference/oled/init),[``||showNumber||``](/reference/oled/shownumber)