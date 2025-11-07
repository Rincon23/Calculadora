import math

while True:

  print("""Olá, seja bem-vindo! \nEssa é sua Calculadora
  1 - Operações Básicas
  2 - Porcentagem
  3 - Raiz Quadrada
  4 - Seno
  5 - Cosseno
  6 - Tangente
  9 - Sair""")

  opc = int(input("Escolha sua opção: "))

  if opc == 1:
      print("""
      Você escolheu as operações básicas
      1 - Soma
      2 - Subtração
      3 - Multiplicação
      4 - Divisão
      """)
      op = int(input("Escolha sua operação: "))
      n1 = float(input("Digite o primeiro número: "))
      n2 = float(input("Digite o segundo número: "))
      print()

      if op == 1:
          print("O resultado foi:", n1 + n2)
      elif op == 2:
          print("O resultado foi:", n1 - n2)
      elif op == 3:
          print("O resultado foi:", n1 * n2)
      elif op == 4:
          try:
              print("O resultado foi:", n1 / n2)
          except ZeroDivisionError:
              print("Erro: divisão por zero!")
      else:
          print("Valor inválido")
      print()

  elif opc == 2:
      print("Você escolheu a porcentagem")
      val = float(input("Digite um valor: "))
      por = float(input("Digite a porcentagem: "))
      print("O resultado foi:", (val * por) / 100)

  elif opc == 3:
      print("Você escolheu a raiz quadrada")
      val = float(input("Digite um valor: "))
      if val < 0:
          print("Erro: não existe raiz quadrada real de número negativo.")
      else:
          print("O resultado foi:", math.sqrt(val))

  elif opc == 4:
      print("Você escolheu o seno")
      val = float(input("Digite um ângulo em graus: "))
      print("O resultado foi:", math.sin(math.radians(val)))

  elif opc == 5:
      print("Você escolheu o cosseno")
      val = float(input("Digite um ângulo em graus: "))
      print("O resultado foi:", math.cos(math.radians(val)))

  elif opc == 6:
      print("Você escolheu a tangente")
      val = float(input("Digite um ângulo em graus: "))
      print("O resultado foi:", math.tan(math.radians(val)))

  elif opc == 9:
      print("Você saiu da calculadora.")
      break

  else:
      print("Valor inválido")
