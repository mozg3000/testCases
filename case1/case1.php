<?php
// Кратные 3 или 5
// Если мы перечислим все натуральные числа до десяти, которые являются кратными 3 или 5, мы получим 3, 5, 6, и 9. Сумма этих чисел – 23.

// Найдите сумму чисел, кратных 3 или 5 до A.

 $range = range(1, 9);
    
$sum = array_reduce($range, function($sum, $number){
	if($number % 3 === 0){
		$sum = $sum + $number;
	}
	if($number % 5 === 0){
		$sum = $sum + $number;
	}
	return $sum;
}, 0);
echo "sum: ";
echo $sum;