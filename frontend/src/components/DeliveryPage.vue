<style src="../stylesheets/styles.css" scoped></style>

<template>
  <header>
    <img class="logo" src="../assets/logo.jpg" alt="Kitty Delivery logo" />
    <img class="title" src="../assets/title.png" alt="Kitty Delivery title" />
    <router-link to="/profile">
        <button class="profile_button">Profile</button>
    </router-link>
  </header>
  <div class="container">
    <div class="main">
      <div class="menu-card">
        <h1>Mes Commandes &#127828;</h1>
        <div class="card-items">
          <div
            class="card-item"
            v-for="(item, index) in menuItems"
            :key="index"
          >
            <p class="item">Prix : {{ item.article_price }} €</p>
            <p class="item">{{ item.article_description }}</p>
            <div class="buttons">
              <button class="button-update" @click="selectItemForEdit(item, index)"> Modifier </button>
              <button class="button-delete" @click="deleteItem(item)"> Supprimer </button>
            </div>
          </div>
        </div>
        <button class="add-button" @click="addItem">Ajouter un produit</button>
      </div>
      <div class="sidebar">
        <router-link to="/tracking">
          <button>Mon suivi de commande</button>
        </router-link>
        <div class="delivery-status">
          <h3>Suivi de livraisons</h3>
          <p class="delivery">Pas de livraison en cours</p>
          <div class="progress-bar">
            <div class="progress"></div>
          </div>
        </div>
        <div class="referral">
          <h3>Parrainage</h3>
          <label>
            <input class="text" type="email" placeholder="Adresse mail à parrainer" />
          </label>
          <button>Parrainer</button>
        </div>
      </div>
    </div>
    <div v-if="selectedItem" class="edit-form">
      <h2>Modifier l'article</h2>
      <form @submit.prevent="modifierItem">
        <input
          type="text"
          v-model="editItem.article_name"
          placeholder="Nom de l'article"
          required
        />
        <textarea
          v-model="editItem.article_description"
          placeholder="Description"
          required
        ></textarea>
        <input
          type="number"
          v-model="editItem.article_price"
          placeholder="Prix"
          required
        />
        <button type="submit">Enregistrer</button>
        <button type="button" @click="cancelEdit">Annuler</button>
      </form>
    </div>
  </div>
</template>
