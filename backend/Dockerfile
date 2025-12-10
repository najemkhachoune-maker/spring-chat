# ----------- Build Stage ------------
FROM maven:3.9-eclipse-temurin-17-alpine AS build
WORKDIR /app

# Copier uniquement pom.xml 
COPY pom.xml .
RUN mvn -B clean package -DskipTests


# Copier le code source
COPY src ./src

# Build l'application
RUN mvn -B clean package -DskipTests


# ----------- Runtime Stage (DISTROLESS) ------------
FROM gcr.io/distroless/java17
WORKDIR /app

# Copier le JAR
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

# Exécuter l'application
CMD ["java", "-jar", "app.jar"]

