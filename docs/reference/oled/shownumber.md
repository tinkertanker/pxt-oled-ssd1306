# show number on OLED

Displays a number on the OLED module.

```sig
OLED.showNumber(123)
```

The ``init`` block must be placed before this.

## Parameters

* **number**: the number to display.

## Example

```blocks
OLED.init(64, 128)
OLED.showNumber(100)
```

# See also
[``||init||``](/reference/oled/init),[``||showString||``](/reference/oled/showstring)