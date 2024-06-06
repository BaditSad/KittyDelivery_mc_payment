<script src="../scripts/TrackingPage.js"></script>
<style src="../stylesheets/styles.css" scoped></style>

<template>
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Suivi - Kitty Delivery</title>
    <link rel="stylesheet" href="../stylesheets/tracking.css">
</head>

<body>
    <header>
        <img class="logo" src="../assets/logo.jpg" alt="Kitty Delivery logo" />
        <img class="title" src="../assets/title.png" alt="Kitty Delivery title" />
        <div class="header-buttons">
            <router-link to="/profile">
                <button class="profile_button">Profile</button>
            </router-link>
            <router-link to="/tracking">
                <button class="profile_button">Tracking</button>
            </router-link>
        </div>
    </header>
    
    <main>
        <section class="tracking-section">
            <h2>Suivi de Livraisons</h2>
            <div class="tracking-info">
                <p>Aucune livraison en cours.</p>
            </div>
        </section>
    </main>
    
    <footer>
        <p>© 2024 - Kitty Delivery</p>
    </footer>
</body>
</template>