## Užduoties frontend

### Kaip pasileisti su Docker ir docker-compose

Pasiklonavus repozitoriją reikia paleisti:
```
docker-compose up -d
```

Tuomet paleistam konteineriui:
```
docker exec -it <konteinerio ID> npm install

docker exec -it <konteinerio ID> npm run dev
```

