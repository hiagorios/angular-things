export function Safe<T>(params: any = {}): Function {
  return function(target: object, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>): TypedPropertyDescriptor<Function> {
    const originalMethod = descriptor.value;

    descriptor.value = function SafeWrapper(): any | false {
      try {
        return originalMethod.apply(this, arguments);
      } catch (error) {
        return params.returnValue !== undefined ? params.returnValue : false;
      }
    };

    return descriptor;
  };
}
