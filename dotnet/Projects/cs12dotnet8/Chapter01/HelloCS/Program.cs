Console.WriteLine("Hello, C#");
string name = typeof(Program).Namespace ?? "No Namespace";
Console.WriteLine($"Namespace: {name}");
//throw new Exception();