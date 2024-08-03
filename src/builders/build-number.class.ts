import Build from "./build.abstract.class";

export class BuildNumber extends Build<number> {
  // 🏗️ Constructor ------------------------------------------ /

  protected constructor(value: number) {
    super(value);
  }

  /**
   * @param value - An numeric value to start with
   * @returns A new builder
   */
  public static from(value: number): BuildNumber;

  /**
   * @param value - An an existing number builder to start with (will not be mutated)
   * @returns A new builder
   */
  public static from(builder: BuildNumber): BuildNumber;

  // Implementation only
  public static from(value: number | BuildNumber): BuildNumber {
    return new BuildNumber(BuildNumber.extractValue(value));
  }

  // 📢 Public ------------------------------------------ /

  public add(number: number): BuildNumber;
  public add(builder: BuildNumber): BuildNumber;
  public add(value: number | BuildNumber): BuildNumber {
    this.builderValue += BuildNumber.extractValue(value);
    return this;
  }

  public subtract(number: number): BuildNumber;
  public subtract(builder: BuildNumber): BuildNumber;
  public subtract(value: number | BuildNumber): BuildNumber {
    this.builderValue -= BuildNumber.extractValue(value);
    return this;
  }

  public multiplyBy(number: number): BuildNumber;
  public multiplyBy(builder: BuildNumber): BuildNumber;
  public multiplyBy(value: number | BuildNumber): BuildNumber {
    this.builderValue *= BuildNumber.extractValue(value);
    return this;
  }

  public divideBy(number: number): BuildNumber;
  public divideBy(builder: BuildNumber): BuildNumber;
  public divideBy(value: number | BuildNumber): BuildNumber {
    this.builderValue /= BuildNumber.extractValue(value);
    return this;
  }

  public mod(number: number): BuildNumber;
  public mod(builder: BuildNumber): BuildNumber;
  public mod(value: number | BuildNumber): BuildNumber {
    this.builderValue %= BuildNumber.extractValue(value);
    return this;
  }

  public round(): BuildNumber {
    this.builderValue = Math.round(this.builderValue);
    return this;
  }

  public floor(): BuildNumber {
    this.builderValue = Math.floor(this.builderValue);
    return this;
  }

  public ceil(): BuildNumber {
    this.builderValue = Math.ceil(this.builderValue);
    return this;
  }

  public random(): BuildNumber {
    this.builderValue = Math.random();
    return this;
  }

  public static valuesOf<R extends Record<string, BuildNumber>>(
    builderRecord: R,
  ): Record<keyof R, number> {
    const values = {} as Partial<Record<keyof R, number>>;
    for (const [key, builder] of Object.entries(builderRecord)) {
      values[key as keyof R] = builder.value;
    }
    return values as Record<keyof R, number>;
  }

  // 🔐 Protected / private ------------------------------------ /

  protected createNewBuilder(): BuildNumber {
    return new BuildNumber(0);
  }

  protected static extractValue(value: number | BuildNumber): number {
    return value instanceof BuildNumber ? value.value : value;
  }
}

export default BuildNumber;
