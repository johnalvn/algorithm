function factorial(n){
    if(n == 1)
        return 1;
        
    var result = factorial(n - 1);
    return result * n;    
    
}

console.log(factorial(5));
