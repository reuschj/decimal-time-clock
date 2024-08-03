export abstract class Build<T> {
  protected builderValue: T;

  protected constructor(value: T) {
    this.builderValue = value;
  }

  protected abstract createNewBuilder(): Build<T>;

  public get value(): T {
    return this.builderValue;
  }

  public set(value: T): typeof this;
  public set(value: Build<T>): typeof this;
  public set(value: T | Build<T>): typeof this {
    this.builderValue = value instanceof Build ? value.value : value;
    return this;
  }

  public tap(sideEffect: () => void) {
    sideEffect();
    return this;
  }

  public clone(): typeof this {
    return this.createNewBuilder().set(this.value) as typeof this;
  }

  public if(condition: boolean | ((value: T) => boolean)) {
    const conditionResult =
      typeof condition === "function"
        ? condition(this.builderValue)
        : condition;
    return new ThenBlock<T, typeof this>(
      conditionResult,
      this,
      this.createNewBuilder as () => typeof this,
    );
  }
}

class ThenBlock<T, BuilderType extends Build<T>> {
  private condition: boolean;
  private parentBuilder: BuilderType;
  private builder: BuilderType;

  public constructor(
    condition: boolean,
    parentBuilder: BuilderType,
    makeBuilder: () => BuilderType,
  ) {
    this.condition = condition;
    this.parentBuilder = parentBuilder;
    this.builder = makeBuilder();
    this.builder.set(parentBuilder.value);
  }

  // biome-ignore lint/suspicious/noThenProperty: <explanation>
  public then(
    ifTrue: (build: BuilderType) => BuilderType,
  ): ElseBlock<T, BuilderType> {
    const passedBuilder = this.condition ? ifTrue(this.builder) : this.builder;
    return new ElseBlock<T, BuilderType>(
      this.condition,
      this.parentBuilder,
      passedBuilder,
    );
  }
}

class ElseBlock<T, BuilderType extends Build<T>> {
  private condition: boolean;
  private parentBuilder: BuilderType;
  private builder: BuilderType;

  public constructor(
    condition: boolean,
    parentBuilder: BuilderType,
    builder: BuilderType,
  ) {
    this.condition = condition;
    this.parentBuilder = parentBuilder;
    this.builder = builder;
  }

  public else(ifFalse: (build: BuilderType) => BuilderType): BuilderType {
    const builder = this.condition ? this.builder : ifFalse(this.builder);
    this.parentBuilder.set(builder.value);
    return this.parentBuilder;
  }
}

export default Build;
