{
  enum WeekDays {
    MON = "Mon",
    TUES = "Tues",
    WEDNES = "Wednes",
    THURS = "Thurs",
    FRI = "Fri",
  }

  type WeekDaysKeys = keyof typeof WeekDays;

  function printDay(key: WeekDaysKeys, message: string) {
    const day = WeekDays[key];

    if (day <= WeekDays.WEDNES) {
      console.log(`It's still ${day}day, ${message}`);
    }
  }

  printDay("TUES", "wanna go home");

  enum FontSize {
    sm = 8,
    md = 16,
    lg = 24,
  }

  type FontSizeKeys = keyof typeof FontSize;

  function fontPicker(
    sizes: {
      sm: number;
      md: number;
      lg: number;
    },
    size: Partial<FontSizeKeys>
  ) {
    return sizes[size];
  }

  fontPicker(FontSize, "md");

  const enum NUMBER {
    ONE = 1,
    TWO = 2,
  }
}
