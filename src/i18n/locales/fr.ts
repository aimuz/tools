import type { Translations } from '../schema';

export const fr: Translations = {
  common: {
    siteName: 'WizGo',
    siteTagline:
      "WizGo est une boîte à outils en ligne gratuite : compression d'images, conversion de format, JWT, horodatages et autres utilitaires de développement. Tout s'exécute dans votre navigateur – aucun téléchargement.",
    aboutLink: 'À propos',
    menuButtonAria: 'Menu',
    languageSwitcherAria: 'Changer de langue',
    scripts: {
      loading: 'Chargement, veuillez réessayer sous peu',
      processing: 'Traitement...',
      processingFailedTemplate: 'Échec : {name}',
      convertFailedTemplate: 'Échec de la conversion : {name}',
      savedPercentTemplate: '· économisé {pct} %',
      optimized: '· déjà optimisé',
      copyBtn: 'Copie',
      downloadBtn: 'Télécharger',
      copying: 'Copier...',
      copied: 'Copié',
      copyFailed: 'Échec de la copie',
      startCompress: 'Commencez à compresser',
      startConvert: 'Commencer la conversion',
      autoDetect: 'Détection automatique',
      canvasError: 'Échec de la création du contexte du canevas',
      parseImageError: "Impossible d'analyser l'image, essayez-en une autre",
      needImageFirst: "Veuillez d'abord télécharger une image",
      needText: 'Veuillez saisir le texte à intégrer',
      noWatermark: 'Aucun filigrane détecté',
      capacityHintTemplate:
        'Capacité {bytes} octets · ~{caractères} caractères',
      capacityErrorTemplate:
        "Capacité d'image dépassée – max {cap} octets (texte actuel {len} octets)",
      imageTooSmallDct:
        'Image trop petite – DCT nécessite au moins 128 × 128 px',
      imageTooSmallLsb:
        'Image trop petite – au moins ~ 32 × 32 px requis pour intégrer un filigrane',
      clipboardNotSupported:
        "L'API du Presse-papiers n'est pas prise en charge dans ce navigateur",
      pngGenerationFailed: 'La génération PNG a échoué',
      audioDecodeFailed:
        "Impossible de décoder l'audio. Essayez un autre fichier ou utilisez Chrome/Firefox.",
      audioEncodeFailed: "Échec de l'encodage audio",
      compareBtn: 'Comparer',
      compareBefore: 'Avant',
      compareAfter: 'Après',
    },
  },
  nav: {
    image: {
      label: 'Images',
      items: {
        compress: {
          name: "Compresser l'image",
          desc: 'Compression intelligente PNG/JPG/WebP',
        },
        convert: {
          name: "Conversion du format d'image",
          desc: 'Échange PNG JPG WebP GIF BMP',
        },
        'png-to-jpg': {
          name: 'PNG en JPG',
          desc: 'Remplissez la transparence avec du blanc · fichiers plus petits',
        },
        'jpg-to-png': {
          name: 'JPG en PNG',
          desc: 'Sauvegarde sans perte · prise en charge de la transparence',
        },
        'png-to-webp': {
          name: 'PNG vers WebP',
          desc: 'Gardez la transparence · fichiers plus petits',
        },
        'jpg-to-webp': {
          name: 'JPG en WebP',
          desc: 'Même qualité · 25 à 35 % plus petit',
        },
        watermark: {
          name: 'Filigrane caché',
          desc: 'Incorporer/extraire le texte masqué',
        },
        'text-watermark': {
          name: 'Filigrane de texte',
          desc: "Pour les cartes d'identité · filigrane antivol",
        },
      },
    },
    dev: {
      label: 'Développeurs',
      items: {
        jwt: {
          name: 'Décoder/vérifier JWT',
          desc: 'Analyser, générer, vérification de signature',
        },
        timestamp: {
          name: "Conversion d'horodatage",
          desc: 'Horodatage Unix ↔ date',
        },
        json: {
          name: 'Format JSON',
          desc: 'Embellir/minifier/valider',
        },
        'code-image': {
          name: 'Coder en image',
          desc: 'Générer des images de partage de code',
        },
        base64: {
          name: 'Encodage/décodage Base64',
          desc: 'Encodage et décodage de textes et de fichiers',
        },
        uuid: {
          name: "Générateur d'UUID",
          desc: 'Générer par lots des identifiants uniques',
        },
        'url-encode': {
          name: "Encodage/décodage d'URL",
          desc: "Encodage des caractères spéciaux de l'URL",
        },
        color: {
          name: 'Convertisseur de couleurs',
          desc: 'Conversions HEX, RGB, HSL',
        },
        qrcode: {
          name: 'Générateur de codes QR',
          desc: 'Générer des codes QR à partir de texte/liens',
        },
        hash: {
          name: 'Générateur de hachage',
          desc: 'Sommes de contrôle SHA-1 / SHA-256 / SHA-384 / SHA-512',
        },
        password: {
          name: 'Générateur de mot de passe',
          desc: 'Générez des mots de passe aléatoires forts',
        },
      },
    },
    media: {
      label: 'Médias',
      items: {
        'mp4-to-mp3': {
          name: 'MP4 en MP3',
          desc: "Extraire l'audio des fichiers vidéo",
        },
        'compress-mp3': {
          name: 'Compresser MP3',
          desc: 'Réduisez la taille du MP3 en réduisant le débit binaire',
        },
      },
    },
    document: {
      label: 'Documents',
      items: {
        'pdf-compress': {
          name: 'Compresser un PDF',
          desc: 'Réduire la taille du fichier PDF',
        },
        'pdf-merge': {
          name: 'Fusion PDF',
          desc: 'Combinez plusieurs PDF en un seul',
        },
      },
    },
  },
  quickActions: {
    'png-compress': {
      name: 'Compresser PNG',
      description: 'Compression intelligente · 60 à 80 % plus petite',
      tags: [
        'Compresser PNG',
        'pngquant',
        "compression d'images",
        'compresser png',
      ],
    },
    'jpg-compress': {
      name: 'Compresser JPG',
      description: 'Compression photo · 30 à 45 % plus petite',
      tags: [
        'Compresser JPG',
        'Compresser JPEG',
        "compression d'images",
        'compresser jpg',
      ],
    },
    'webp-compress': {
      name: 'Compresser WebP',
      description: 'Compression sans perte · conserver la transparence',
      tags: ['Compresser WebP', 'compresser WebP'],
    },
    'png-to-jpg': {
      name: 'PNG en JPG',
      description:
        'Remplissez la transparence avec du blanc · fichiers plus petits',
      tags: ['png en jpg', 'png en jpeg', 'convertir png'],
    },
    'jpg-to-png': {
      name: 'JPG en PNG',
      description: 'Sauvegarde sans perte · prise en charge de la transparence',
      tags: ['jpg en png', 'jpeg en png', 'convertir jpg'],
    },
    'png-to-webp': {
      name: 'PNG vers WebP',
      description: 'Gardez la transparence · fichiers plus petits',
      tags: ['png en webp', 'convertir en webp'],
    },
    'jpg-to-webp': {
      name: 'JPG en WebP',
      description: 'Même qualité, fichiers plus petits',
      tags: ['jpg en webp', 'jpeg en webp', 'convertir en webp'],
    },
    'webp-to-png': {
      name: 'WebP en PNG',
      description: 'Remplacement de la compatibilité WebP',
      tags: ['webp en png', 'convertir webp'],
    },
    'webp-to-jpg': {
      name: 'WebP en JPG',
      description: 'Compatible avec les plateformes existantes',
      tags: ['webp en jpg', 'convertir webp'],
    },
    'code-image': {
      name: 'Coder en image',
      description: 'Générer des images de partage à partir du code',
      tags: ['code', 'image', 'partager', 'carbone', 'fragment'],
    },
    jwt: {
      name: 'Décodage JWT',
      description: 'Générer, analyser, vérifier',
      tags: ['JWT', 'jeton', 'jsonwebtoken', 'décoder', 'vérifier'],
    },
    timestamp: {
      name: "Conversion d'horodatage",
      description: 'Horodatage Unix ↔ date',
      tags: ['horodatage', 'Unix', 'date', 'temps', 'époque'],
    },
    json: {
      name: 'Format JSON',
      description: 'Embellir, réduire, valider JSON',
      tags: ['JSON', 'format', 'embellir', 'minimiser', 'valider', 'analyseur'],
    },
    base64: {
      name: 'Encodage/décodage Base64',
      description: 'Convertir du texte/fichiers vers et depuis Base64',
      tags: [
        'Base64',
        'encoder',
        'décoder',
        'déposer',
        'encodage base64',
        'décodage base64',
      ],
    },
    uuid: {
      name: "Générateur d'UUID",
      description: 'Générer par lots des identifiants uniques',
      tags: [
        'UUID',
        'GUID',
        'identifiant unique',
        'identifiant aléatoire',
        "générateur d'uuid",
      ],
    },
    'url-encode': {
      name: "Encodage/décodage d'URL",
      description: "Encoder/décoder les caractères spéciaux de l'URL",
      tags: [
        "Encodage d'URL",
        "Décodage d'URL",
        'encodeURIComponent',
        'pourcentage de codage',
        "encodage d'URL",
      ],
    },
    color: {
      name: 'Convertisseur de couleurs',
      description: 'Conversion de valeur de couleur HEX, RGB, HSL',
      tags: [
        'couleur',
        'convertisseur de couleurs',
        'RGB',
        'HEX',
        'HSL',
        'sélecteur de couleurs',
      ],
    },
    qrcode: {
      name: 'Générateur de codes QR',
      description: 'Générer des codes QR à partir de texte/liens',
      tags: ['Code QR', 'code à barres', 'générateur de code QR', 'QR'],
    },
    'any-convert': {
      name: "Conversion d'images",
      description: 'Échange de format PNG JPG WebP',
      tags: [
        "conversion d'image",
        "conversion de format d'image",
        'png en jpg',
        'jpg en png',
        'WebP',
        'HEIC',
        'PGB',
        'GIF',
      ],
    },
    'any-compress': {
      name: "Compresser l'image",
      description: "Compresser n'importe quelle image",
      tags: ['compresse', 'général'],
    },
    watermark: {
      name: 'Filigrane caché',
      description: 'Incorporer/extraire le texte masqué',
      tags: ['filigrane caché', 'stéganographie', 'filigrane', 'LSB', 'DCT'],
    },
    'text-watermark': {
      name: 'Filigrane de texte',
      description: "Carte d'identité / filigrane antivol",
      tags: [
        'filigrane de texte',
        "filigrane d'image",
        'filigrane photo',
        'ajouter un filigrane',
        'filigrane en ligne',
        "Filigrane d'identification",
        'filigrane de document',
        "filigrane de droit d'auteur",
        'filigrane antivol',
      ],
    },
    'mp4-to-mp3': {
      name: 'MP4 en MP3',
      description: "Extraire l'audio de la vidéo · 128-320 kbps",
      tags: [
        'mp4 en mp3',
        'vidéo en mp3',
        "extraire l'audio",
        'audio mp4',
        'convertisseur mp3',
        'extracteur audio',
      ],
    },
    'compress-mp3': {
      name: 'Compresser MP3',
      description:
        'Réduire les fichiers MP3 · débit binaire inférieur, même format',
      tags: [
        'compresser mp3',
        'compresseur mp3',
        'rétrécir mp3',
        'réducteur de taille mp3',
        'compression audio',
        'réduire la taille du mp3',
        'débit mp3',
      ],
    },
    'pdf-compress': {
      name: 'Compresser un PDF',
      description: "Réduire la taille du fichier PDF · s'exécute localement",
      tags: [
        'compresser pdf',
        'compresser un pdf',
        'rétrécir pdf',
        'réduire la taille du pdf',
        'compresseur pdf',
        'optimiseur de pdf',
      ],
    },
    'pdf-merge': {
      name: 'Fusion PDF',
      description: 'Combinez plusieurs PDF en un seul · réorganisez les pages',
      tags: [
        'fusion pdf',
        'fusionner un pdf',
        'combiner pdf',
        'combiner pdf',
        'rejoindre pdf',
        'rejoindre pdf',
      ],
    },
    hash: {
      name: 'Générateur de hachage',
      description: 'SHA-1 / SHA-256 / SHA-384 / SHA-512 en un clic',
      tags: [
        'hacher',
        'sha256',
        'sha-256',
        'sha512',
        'somme de contrôle',
        'hachage de fichier',
        'sha1',
        'intégrité des fichiers',
      ],
    },
    password: {
      name: 'Générateur de mot de passe',
      description:
        'Générez des mots de passe aléatoires forts avec des options personnalisables',
      tags: [
        'générateur de mot de passe',
        'mot de passe aléatoire',
        'mot de passe fort',
        'mot de passe sécurisé',
        'créateur de mot de passe',
        'générer un mot de passe',
      ],
    },
  },
  toolCategories: {
    image: {
      name: 'Images',
      description: "Compression d'images et conversion de format",
      tools: {
        compress: {
          name: "Compresser l'image",
          description: 'Compresser les images tout en gardant la qualité',
        },
        convert: {
          name: "Conversion du format d'image",
          description: 'Échange PNG JPG WebP GIF BMP',
        },
        watermark: {
          name: 'Filigrane caché',
          description: 'Incorporer/extraire le texte masqué',
        },
        'text-watermark': {
          name: 'Filigrane de texte',
          description: 'Antivol / Filigrane de document',
        },
      },
    },
    code: {
      name: 'Développeurs',
      description: 'Outils pour les développeurs',
      tools: {
        'code-image': {
          name: 'Coder en image',
          description: 'Transformez le code en superbes images de partage',
        },
        json: {
          name: 'JSON',
          description: 'Formatage JSON',
        },
        jwt: {
          name: 'JWT',
          description: 'Générer/analyser/vérifier',
        },
        timestamp: {
          name: 'Horodatage',
          description: "Conversion d'horodatage Unix",
        },
        base64: {
          name: 'Base64',
          description: 'Encodage et décodage de texte/fichier',
        },
        uuid: {
          name: 'UUID',
          description: 'Générer par lots des identifiants uniques',
        },
        'url-encode': {
          name: "Encodage/décodage d'URL",
          description: "Encodage des caractères spéciaux de l'URL",
        },
        color: {
          name: 'Convertisseur de couleurs',
          description: 'Conversions HEX, RGB, HSL',
        },
        qrcode: {
          name: 'Générateur de codes QR',
          description: 'Générer des codes QR à partir de texte/liens',
        },
        hash: {
          name: 'Générateur de hachage',
          description:
            'Sommes de contrôle de la famille SHA pour le texte et les fichiers',
        },
        password: {
          name: 'Générateur de mot de passe',
          description: 'Générez des mots de passe aléatoires forts',
        },
      },
    },
    media: {
      name: 'Médias',
      description: 'Conversion audio et vidéo',
      tools: {
        'mp4-to-mp3': {
          name: 'MP4 en MP3',
          description: "Extraire l'audio des fichiers vidéo",
        },
        'compress-mp3': {
          name: 'Compresser MP3',
          description: 'Réduire la taille du fichier MP3',
        },
      },
    },
    document: {
      name: 'Documents',
      description: 'Traitement PDF',
      tools: {
        'pdf-compress': {
          name: 'Compresser un PDF',
          description: 'Réduire la taille du fichier PDF',
        },
        'pdf-merge': {
          name: 'Fusion PDF',
          description: 'Combinez plusieurs PDF en un seul',
        },
      },
    },
  },
  notFound: {
    title: 'Page introuvable - WizGo',
    h1: '404',
    body: 'La page que vous recherchez n’existe pas : le lien est peut-être erroné ou la page a peut-être été supprimée.',
    homeBtn: 'Retour à la maison',
  },
  manifest: {
    name: 'WizGo',
    shortName: 'WizGo',
    description:
      "Boîte à outils en ligne gratuite : compression d'images, conversion de format, JWT, horodatages et plus encore – s'exécute localement, sans téléchargement",
  },
  pages: {
    home: {
      title:
        'Boîte à outils en ligne gratuite : compresser, JWT, horodatages | WizGo',
      description:
        "Outils gratuits intégrés au navigateur : compression d'image, conversion de format, décodage JWT, horodatage, formatage JSON, code en image. Aucun téléchargement, aucune installation.",
      heroHeading: 'Boîte à outils en ligne gratuite',
      heroSubheading:
        "Compression d'image, conversion de format, JWT, horodatages · s'exécute localement",
      searchPlaceholder:
        'Outils de recherche, par ex. Compresser PNG, en JPG...',
      emptyState: 'Aucun outil correspondant',
      features: {
        noUpload: 'No upload',
        free: 'Utilisation gratuite',
        noInstall: 'No install',
      },
      schema: {
        alternateName: 'Boîte à outils WizGo',
      },
    },
    compressFormat: {
      titleTemplate:
        '{label} Compress : outil gratuit en ligne sans perte | WizGo',
      descriptionTemplate:
        "Compresser {label} en ligne – {seoBenefit} S'exécute dans votre navigateur, aucun téléchargement.",
      h1Template: "{label} Compression d'image",
      formats: {
        png: {
          headline:
            'Conservez la transparence · généralement 60 à 80 % plus petit',
          hint: "Idéal pour les captures d'écran, les illustrations, les icônes et les logos. Visuellement impossible à distinguer de l'original ; fonds transparents préservés automatiquement.",
          seoBenefit:
            "les captures d'écran et les icônes rétrécissent de 60 à 80 %, les photos de 20 à 30 %, pratiquement aucune perte de qualité.",
        },
        jpg: {
          headline:
            'Compression photo-réglée · généralement 30 à 45 % plus petite',
          hint: 'Optimisé pour les photos avec pratiquement aucune perte de qualité visible ; supprime également l’emplacement intégré, l’appareil et d’autres métadonnées de confidentialité.',
          seoBenefit:
            "les fichiers diminuent de 30 à 45 %, l'emplacement EXIF ​​et les métadonnées de l'appareil sont automatiquement supprimés.",
        },
        webp: {
          headline: 'Compression sans perte · conserve la transparence',
          hint: "Optimisation WebP sans perte qui préserve pleinement la qualité et la transparence. Si votre image est déjà suffisamment petite, l'outil renvoie l'original intact.",
          seoBenefit:
            "optimisation sans perte qui préserve la transparence, renvoie l'original s'il est déjà optimal.",
        },
      },
      upload: {
        dragTemplate: 'Déposez les images {label} ici',
        orClick:
          'ou cliquez pour télécharger (autres formats acceptés également)',
        pasteHint: 'ou appuyez sur ⌘V / Ctrl+V pour coller',
        sizeHint: "Jusqu'à 100 Mo · pris en charge par lots",
      },
      options: {
        strength: 'Niveau de compression :',
        smart: 'Intelligent',
        light: 'Lumière',
        strong: 'Fort',
        start: 'Commencez à compresser',
      },
      aboutTemplate: 'À propos de la compression {label}',
      related: {
        label: "Compression d'autres formats",
        compressTemplate: '{label} Compresser',
        toJpgTemplate: '{label} en JPG',
        toWebpTemplate: '{label} vers WebP',
        all: "Toutes les compressions d'images",
      },
      schema: {
        browserReq: 'Navigateur moderne avec prise en charge de WebAssembly',
        descriptionTemplate:
          "Compression d'image {complète} en ligne – {headline}.",
      },
    },
    convertPair: {
      titleTemplate:
        '{fromLabel} vers {toLabel} : convertisseur en ligne gratuit | WizGo',
      descriptionTemplate:
        "Convertissez {fromLabel} en {toLabel} en ligne. {hintWithSpace}S'exécute localement, aucun téléchargement.",
      h1Template: '{fromLabel} à {toLabel}',
      fallbackHintTemplate:
        "Convertir les images {fromFull} en {toFull} en ligne · s'exécute localement, sans téléchargement",
      pairHints: {
        'png-jpg':
          'Arrière-plans transparents remplis de blanc, généralement 40 à 80 % plus petits, parfaits pour le Web, la messagerie électronique et le chat.',
        'png-webp':
          'WebP conserve la transparence tout en étant 25 à 50 % plus petit que PNG, largement pris en charge.',
        'png-gif':
          "Pour les plates-formes existantes qui n'acceptent que les GIF.",
        'png-bmp':
          'BMP non compressé sans perte pour les anciennes applications Windows.',
        'jpg-png':
          "Sauvegarde sans perte avec transparence - utile avant la suppression de l'arrière-plan.",
        'jpg-webp':
          "25 à 35 % plus petit avec pratiquement aucune différence visible : idéal pour les sites contenant beaucoup d'images.",
        'jpg-gif':
          'Photos au format GIF pour les anciennes plateformes de chat.',
        'jpg-bmp':
          "Bitmap sans perte mais très volumineux — pour l'impression ou la saisie d'un programme spécial.",
        'webp-png':
          'Lorsque WebP n’est pas pris en charge, PNG constitue la solution de secours la plus sûre. Transparence préservée.',
        'webp-jpg':
          'Idéal pour les plates-formes ne prenant pas en charge WebP (forums, éditeurs plus anciens).',
        'webp-gif':
          "Pour les anciens navigateurs ou plateformes de chat qui n'acceptent que les GIF.",
        'webp-bmp':
          "Pour des programmes graphiques spécifiques ou des pipelines d'impression.",
        'gif-png':
          'Conserve la transparence, une qualité plus nette (première image uniquement).',
        'gif-jpg':
          'Fichiers plus petits mais perdant leur transparence, première image uniquement – ​​adaptés au partage.',
        'gif-webp':
          'GIF statiques compressés davantage en tant que WebP, transparence conservée.',
        'gif-bmp':
          'Première image uniquement, pour le traitement graphique par lots.',
        'bmp-png':
          'Réduction majeure de la taille sans perte (70 %+) – idéale pour l’archivage.',
        'bmp-jpg':
          "Compression la plus élevée pour le partage de numérisations et de captures d'écran en masse.",
        'bmp-webp':
          'Taux de compression le plus élevé, pris en charge par les navigateurs modernes.',
        'bmp-gif':
          "Pour les anciennes plates-formes de discussion ou de forum n'acceptant que les GIF.",
      },
      upload: {
        dragTemplate: 'Déposez les images {fromLabel} ici',
        orClick:
          "ou cliquez pour télécharger (autres formats d'image acceptés également)",
        pasteHint: 'ou appuyez sur ⌘V / Ctrl+V pour coller',
        sizeHint: "Jusqu'à 100 Mo · pris en charge par lots",
      },
      options: {
        quality: 'Qualité:',
        qualityLossless: 'Sans perte',
        qualityHigh: 'Haut',
        qualityMid: 'Moyen',
        qualityLow: 'Faible',
        startTemplate: 'Convertir en {toLabel}',
      },
      related: {
        label: 'Conversions associées',
        pairTemplate: '{fromLabel} à {toLabel}',
        more: 'Plus de formats',
      },
      schema: {
        descriptionTemplate:
          "Convertissez les images {fromFull} en {toFull} en ligne : s'exécute localement, sans téléchargement.",
      },
    },
    compress: {
      title: "Compression d'image : PNG/JPG/WebP gratuit en ligne | WizGo",
      description:
        "Compressez les formats PNG, JPG, JPEG, WebP, GIF en ligne : un algorithme intelligent préserve la qualité, prend en charge les lots, s'exécute dans le navigateur, aucun téléchargement.",
      h1: "Compression d'images",
      subheading:
        "Compression PNG, JPG, WebP en ligne · s'exécute localement · pris en charge par lots",
      schema: {
        name: "Compression d'images",
        description:
          "Compression d'images en ligne gratuite pour PNG, JPG, WebP — s'exécute localement, sans téléchargement",
        browserReq: 'Navigateur moderne avec prise en charge de WebAssembly',
      },
      upload: {
        drag: 'Déposez des images ici',
        orClick: 'ou cliquez pour télécharger',
        pasteHint: 'ou appuyez sur ⌘V / Ctrl+V pour coller',
        sizeHint: "JPG, PNG, WebP, GIF pris en charge · jusqu'à 100 Mo",
      },
      options: {
        strength: 'Niveau de compression :',
        smart: 'Intelligent',
        light: 'Lumière',
        strong: 'Fort',
        start: 'Commencez à compresser',
      },
    },
    convert: {
      title: "Convertisseur de format d'image : PNG/JPG/WebP/HEIC | WizGo",
      description:
        "Convertissez les formats PNG, JPG, JPEG, WebP, GIF, BMP en ligne — s'exécute dans votre navigateur, sans téléchargement, ni installation.",
      h1: "Convertisseur de format d'image",
      subheading:
        'Échange en ligne de PNG, JPG, WebP, GIF, BMP · fonctionne localement',
      schema: {
        name: "Convertisseur de format d'image",
        description:
          'Échange en ligne PNG, JPG, WebP, GIF, BMP — fonctionne localement, pas de téléchargement',
      },
      upload: {
        drag: 'Déposez des images ici',
        orClick: 'ou cliquez pour télécharger',
        pasteHint: 'ou appuyez sur ⌘V / Ctrl+V pour coller',
        sizeHint: "Jusqu'à 100 Mo",
      },
      options: {
        fromLabel: 'Format source :',
        autoDetect: 'Détection automatique',
        toLabel: 'Convertir en :',
        qualityLabel: 'Qualité:',
        qualityLossless: 'Sans perte',
        qualityHigh: 'Haut',
        qualityMid: 'Moyen',
        qualityLow: 'Faible',
        start: 'Commencer la conversion',
      },
    },
    about: {
      title:
        'À propos de WizGo — Outils, confidentialité et pile axés sur le local',
      description:
        "Politique technique et de confidentialité de WizGo : les outils s'exécutent localement dans votre navigateur – aucun téléchargement de fichiers. Construit avec Astro + Rust WASM + WebCrypto.",
      h1: 'À propos de WizGo',
      schema: {
        name: 'À propos de WizGo',
        description:
          "Pile technologique et politique de confidentialité de WizGo : tous les outils s'exécutent dans votre navigateur – aucun téléchargement.",
        orgDescription:
          "Boîte à outils en ligne gratuite : compression d'images, conversion de format, JWT, horodatages et plus encore. Traitement pur dans le navigateur – aucun téléchargement.",
      },
      intro:
        "WizGo est une boîte à outils en ligne gratuite, sécurisée et rapide. Nous pensons que la confidentialité des utilisateurs est essentielle, c'est pourquoi chaque outil s'exécute localement dans votre navigateur : les fichiers et les données ne quittent jamais votre appareil.",
      techStack: {
        heading: 'Pile technologique',
        image: {
          title: "Traitement d'images",
          body: "Modules WebAssembly construits en Rust avec quantification de palette imagequant et pipeline d'optimisation de l'encodeur jpeg. Prend en charge les formats PNG, JPEG, WebP, GIF, BMP.",
        },
        crypto: {
          title: 'Cryptographie et signature',
          body: "Le décodage, la signature et la vérification JWT s'exécutent tous sur l'API WebCrypto native du navigateur. Prend en charge les familles d'algorithmes HS, RS et ES sans aucune dépendance tierce.",
        },
        frontend: {
          title: 'Cadre frontal',
          body: 'Construit sur la génération de sites statiques Astro avec Tailwind CSS pour une interface utilisateur propre de style Vercel.',
        },
        pwa: {
          title: 'Prise en charge des PWA',
          body: 'Prise en charge des applications Web progressives : installable sur ordinateur et mobile, fonctionne hors ligne.',
        },
      },
      privacy: {
        heading: 'politique de confidentialité',
        intro:
          'WizGo est une architecture purement frontend ; chaque fichier est traité dans votre navigateur :',
        items: [
          'Les fichiers ne sont jamais téléchargés sur aucun serveur',
          "Aucune donnée personnelle n'est collectée",
          'Une petite quantité de données de préférences est stockée localement dans LocalStorage',
        ],
      },
      limits: {
        heading: 'Limites',
        intro:
          "En raison des contraintes de l'environnement du navigateur, WizGo a les limites d'utilisation suivantes :",
        items: [
          'Les fichiers image doivent rester inférieurs à 100 Mo',
          'Les fichiers volumineux peuvent prendre plus de temps à traiter',
          "Certains algorithmes de compression avancés (treillis mozjpeg, libwebp avec perte) sont limités par la chaîne d'outils WASM pure-Rust",
        ],
      },
      credits: {
        heading: 'Remerciements Open Source',
        intro:
          'WizGo est construit avec les excellentes bibliothèques open source suivantes :',
        items: [
          {
            label: 'imagequant',
            href: 'https://github.com/ImageOptim/libimagequant',
            desc: 'Quantification de la palette PNG',
          },
          {
            label: 'lodepng-rouille',
            href: 'https://github.com/kornelski/lodepng-rust',
            desc: 'Encodage PNG Pure-Rust',
          },
          {
            label: 'encodeur jpeg',
            href: 'https://github.com/vstroebel/jpeg-encoder',
            desc: 'Encodeur JPEG Rust',
          },
          {
            label: 'Astro',
            href: 'https://astro.build',
            desc: 'Générateur de site statique moderne',
          },
          {
            label: 'Geist',
            href: 'https://vercel.com/font',
            desc: 'Caractère de conception Vercel',
          },
        ],
      },
    },
    watermark: {
      title: "Filigrane d'image masquée : Intégrer/Extraire | WizGo",
      description:
        'Intégrez du texte masqué dans les pixels de l’image ou extrayez un filigrane – stéganographie LSB et DCT. Traitement pur dans le navigateur, pas de téléchargement.',
      h1: 'Filigrane d’image cachée',
      subheading:
        "Masquer le texte à l'intérieur des pixels de l'image ou l'extraire · s'exécute localement",
      schema: {
        name: 'Filigrane d’image cachée',
        description:
          "Intégrez du texte masqué dans les pixels de l'image ou extrayez le filigrane des images. Prend en charge les algorithmes LSB et DCT. Traitement pur dans le navigateur.",
      },
      tabs: {
        embed: 'Intégrer',
        extract: 'Extrait',
      },
      common: {
        imageLabel: 'Image',
        dropImage: 'Cliquez ou déposez une image ici',
        formats: 'PNG · JPG · WebP',
        replaceImage: "Remplacer l'image",
        copyBtn: 'Copie',
      },
      embed: {
        textLabel: 'Texte masqué',
        textPlaceholder: 'par ex. © Auteur 2026',
        runBtn: 'Intégrer un filigrane',
        jpgWarn:
          "La sortie est toujours au format PNG — l'enregistrement au format PNG conserve la compatibilité la plus large",
        resultLabel: 'Résultat filigrané',
        downloadBtn: 'Télécharger PNG',
        copyImageBtn: "Copier l'image",
      },
      extract: {
        resultLabel: 'Texte extrait',
        resultPlaceholder:
          'Cliquez sur le bouton ci-dessous pour extraire le filigrane',
        runBtn: 'Extraire le filigrane',
      },
      faq: {
        heading: 'Comment ça marche',
        paragraphs: [
          'Cachez un morceau de texte à l’intérieur d’une image – le changement est invisible à l’œil nu et les dimensions de l’image restent les mêmes, mais cet outil peut relire le texte. Utile pour les signatures invisibles, le traçage de la source ou la fixation de notes cachées.',
          "La sortie intégrée est toujours enregistrée au format PNG pour préserver le signal de filigrane complet. Si l'image est ensuite réenregistrée au format JPG et recompressée, le texte court est généralement toujours récupéré ; un texte long ou une compression répétée peuvent se briser - conservez l'original PNG pour des raisons de sécurité.",
          "Tout s'exécute localement dans votre navigateur : ni l'image ni le texte ne sont téléchargés.",
        ],
      },
    },
    uuid: {
      title:
        "Générateur d'UUID : outil de traitement par lots en ligne | WizGo",
      description:
        "Générateur d'UUID v4 en ligne gratuit — lot, formats multiples (standard / sans tirets / majuscules), copie en un clic. Aléatoire crypto-sécurisé, fonctionne localement.",
      h1: "Générateur d'UUID",
      subheading:
        "Générer par lots des identifiants uniques · standard / sans tirets / majuscules · s'exécute localement",
      schema: {
        name: "Générateur d'UUID",
        description:
          "Générateur d'UUID par lots en ligne avec plusieurs formats",
      },
      countLabel: 'Compter',
      formatLabel: 'Options de formatage',
      noDashes: 'Supprimer les tirets (-)',
      uppercase: 'Majuscule',
      generateBtn: 'Régénérer',
      resultLabel: 'Généré',
      copyAllBtn: 'Copier tout',
      copiedAllBtn: 'Tout copié',
      empty: 'Cliquez sur "Régénérer" pour générer des UUID',
      copyBtn: 'Copie',
      copiedBtn: 'Copié',
      info: {
        heading: "À propos de l'UUID",
        body: "UUID (Universally Unique Identifier) ​​est un identifiant de 128 bits, généralement représenté sous la forme de 32 chiffres hexadécimaux répartis en 5 groupes. Cet outil utilise le générateur aléatoire cryptographiquement sécurisé intégré (crypto.getRandomValues) du navigateur pour produire l'UUID v4, garantissant un caractère unique extrêmement élevé – adapté aux clés primaires de bases de données, aux identifiants de session, aux clés API, etc.",
      },
    },
    urlEncode: {
      title: "Encodage/Décodage d'URL : Outil en ligne | WizGo",
      description:
        "Encodage/décodage d'URL gratuit en ligne — Unicode et caractères spéciaux, traitement par lots, modes encodeURI vs encodeURIComponent. Fonctionne localement.",
      h1: "Encodage/décodage d'URL",
      subheading:
        "Codage des caractères spéciaux d'URL · prend en charge Unicode · traitement par lots · s'exécute localement",
      schema: {
        name: "Encodage/décodage d'URL",
        description:
          "Outil d'encodage/décodage d'URL avec prise en charge Unicode et caractères spéciaux",
      },
      tabEncode: 'Encoder',
      tabDecode: 'Décoder',
      encodeMode: {
        label: "Mode d'encodage",
        component: 'Encodage complet (recommandé)',
        uri: "Conserver les caractères de l'URL",
        componentHint:
          "Encodage complet : encode tous les caractères spéciaux – idéal pour les valeurs des paramètres d'URL",
        uriHint:
          "Conserver les caractères de l'URL : conserve : /? # & = et autres caractères réservés – idéal pour les URL complètes",
      },
      labels: {
        inputEncode: 'Saisir du texte',
        inputDecode: 'Entrée codée',
        outputEncode: 'Résultat codé',
        outputDecode: 'Résultat décodé',
      },
      placeholders: {
        inputEncode: 'Tapez le texte à encoder...',
        inputDecode: 'Collez une chaîne codée en URL pour décoder...',
        output: 'Le résultat apparaîtra ici...',
      },
      hint: 'Lot multiligne pris en charge',
      copyBtn: 'Copie',
      copiedBtn: 'Copié',
      clearBtn: 'Clair',
      charCountTemplate: 'Caractères : {count}',
      errors: {
        encode:
          "Échec de l'encodage : contient des caractères qui ne peuvent pas être encodés",
        decode: 'Échec du décodage : chaîne codée en URL non valide',
      },
      examples: {
        heading: 'Exemples',
        labels: {
          chinese: 'Chine',
          space: 'Espace',
          ampersand: '&',
          equals: '=',
        },
      },
      useCases: {
        heading: "Cas d'utilisation",
        items: [
          'Transmettre des caractères non-ASCII dans les URL',
          'Créer des URL avec des paramètres de requête',
          'Gérer les caractères spéciaux dans les données du formulaire',
          'Encoder les paramètres de requête API',
          "Décoder les chaînes d'URL précédemment encodées",
        ],
      },
    },
    qrcode: {
      title: 'Générateur de code QR - Texte en ligne/Lien vers QR | WizGo',
      description:
        'Générateur de codes QR en ligne gratuit pour le texte, les URL et les contacts. Personnalisez la taille et les couleurs ; télécharger PNG/SVG. Génération pure dans le navigateur, pas de téléchargements.',
      h1: 'Générateur de codes QR',
      subheading:
        'Texte/liens vers les codes QR · styles personnalisables · téléchargement PNG/SVG · fonctionne localement',
      schema: {
        name: 'Générateur de codes QR',
        description:
          'Générateur de code QR en ligne avec taille et couleur personnalisées',
      },
      content: {
        label: 'Contenu',
        placeholder: 'Tapez du texte ou une URL...',
        hint: 'Prend en charge le texte, les URL, les e-mails, les numéros de téléphone et plus encore',
      },
      size: 'Taille',
      colors: {
        label: 'Couleurs',
        foreground: 'Premier plan',
        background: 'Arrière-plan',
      },
      ec: {
        label: "Correction d'erreur",
        low: 'Faible',
        medium: 'Moyen',
        quartile: 'Haut',
        high: 'Le plus haut',
        lowTitle: "Faible - Correction d'erreur de ~ 7 %",
        mediumTitle: "Moyen - Correction d'erreur d'environ 15 %",
        quartileTitle: "Élevé - ~25 % de correction d'erreur",
        highTitle: "Le plus élevé - Correction d'erreur d'environ 30 %",
        hint: "Une correction d'erreur plus élevée tolère plus d'occlusion ou de dommages sur le code QR",
      },
      generateBtn: 'Générer un code QR',
      resetBtn: 'Réinitialiser',
      preview: 'Aperçu',
      previewEmpty: 'Tapez le contenu et cliquez sur "Générer le code QR"',
      generating: 'Générateur...',
      generateError: 'Échec de la génération — veuillez vérifier le contenu',
      emptyContent: 'Veuillez saisir le contenu',
      downloadPng: 'Télécharger PNG',
      downloadSvg: 'Télécharger SVG',
      infoTemplate:
        'Longueur : {chars} caractères / {bytes} octets · Taille : {size}x{size}px',
      examples: {
        heading: 'Exemples',
        url: 'URL :',
        email: 'E-mail:',
        phone: 'Téléphone:',
        wifi: 'Wi-Fi :',
      },
    },
    timestamp: {
      title: "Convertisseur d'horodatage Unix — Horodatage ↔ Date | WizGo",
      description:
        "Convertisseur d'horodatage Unix gratuit ↔ date — sec/ms, UTC/fuseau horaire local, ISO 8601. Affichage de l'horodatage en direct, copie en un clic. Fonctionne localement.",
      h1: "Convertisseur d'horodatage",
      subheading:
        'Horodatage Unix ↔ date · secondes / millisecondes / ISO 8601',
      schema: {
        name: "Convertisseur d'horodatage Unix",
        description:
          'Horodatage Unix ↔ convertisseur de date avec prise en charge des secondes/millisecondes et UTC/fuseau horaire local',
      },
      currentTime: {
        label: 'Heure actuelle',
        pauseBtn: 'Pause',
        resumeBtn: 'CV',
        unixSec: 'Unix seconde',
        unixMs: 'MS Unix',
        localTime: 'Heure locale',
        isoUtc: 'ISO 8601 (UTC)',
        tzTemplate: 'Fuseau horaire : {tz} · UTC{sign}{h} :{m}',
        tzPlaceholder: 'Fuseau horaire : –',
      },
      t2d: {
        label: 'Horodatage → Date',
        fillNowBtn: 'Remplissez maintenant',
        units: {
          auto: 'Auto',
          sec: 'seconde',
          ms: 'MS',
        },
        placeholder: 'par ex. 1516239022 ou 1516239022000',
        errors: {
          nan: 'Doit être un nombre',
          oor: 'Numéro hors limites',
          invalid: 'Horodatage invalide',
        },
        outputs: {
          local: 'Heure locale',
          utc: 'Heure UTC',
          iso: 'OIN 8601',
          relative: 'Relatif',
        },
      },
      d2t: {
        label: 'Date → Horodatage',
        fillNowBtn: 'Remplissez maintenant',
        isoPlaceholder: 'ou collez la chaîne ISO : 2024-01-18T03:30:22Z',
        errors: {
          invalidDate: 'Date invalide',
          unparseable: "Impossible d'analyser la chaîne de date",
        },
        outputs: {
          sec: 'Unix seconde',
          ms: 'MS Unix',
          iso: 'ISO 8601 (UTC)',
        },
      },
      copyBtn: 'Copie',
      copiedBtn: 'Copié',
      justNow: "tout à l' heure",
      footerHint:
        'Époque Unix : 1970-01-01 00:00:00 UTC · Seconde à 10 chiffres · Milliseconde à 13 chiffres',
    },
    color: {
      title: 'Convertisseur de couleurs : HEX/RGB/HSL en ligne | WizGo',
      description:
        'Convertisseur de couleurs HEX, RGB, HSL gratuit en ligne — aperçu en direct, copie en un clic. Conçu pour les concepteurs et les développeurs. Fonctionne localement.',
      h1: 'Convertisseur de couleurs',
      subheading:
        "Conversion des valeurs de couleur HEX, RGB et HSL · aperçu en direct · s'exécute localement",
      schema: {
        name: 'Convertisseur de couleurs',
        description:
          'Convertisseur de valeur de couleur HEX, RGB et HSL avec aperçu en direct',
      },
      pickerHint: 'Choisissez une couleur',
      hex: {
        label: 'Valeur hexadécimale',
      },
      rgb: {
        label: 'Valeurs RGB',
        r: 'R (rouge)',
        g: 'G (vert)',
        b: 'B (bleu)',
      },
      hsl: {
        label: 'Valeurs HSL',
        h: 'H (teinte)',
        s: 'S (saturation)',
        l: 'L (légèreté)',
      },
      copyBtn: 'Copie',
      copiedBtn: 'Copié',
      quickColorsLabel: 'Couleurs rapides',
      colorNames: {
        black: 'Noir',
        red: 'Rouge',
        orange: 'Orange',
        amber: 'Ambre',
        yellowGreen: 'Jaune-vert',
        green: 'Vert',
        cyan: 'Cyan',
        blue: 'Bleu',
        indigo: 'Indigo',
        purple: 'Violet',
        pink: 'Rose',
        white: 'Blanc',
      },
      randomBtn: 'Couleur aléatoire',
    },
    codeImage: {
      title:
        "Coder en image - Magnifique générateur d'images de partage de code | WizGo",
      description:
        "Transformez des extraits de code en superbes images de partage en ligne. Prend en charge JavaScript, TypeScript, Python, Go, Rust et bien d'autres. Choisissez un thème, téléchargez-le au format PNG.",
      h1: 'Coder en image',
      subheading:
        'Générez de belles images de partage à partir du code · multilingue · multithème',
      schema: {
        name: 'Coder en image',
        description:
          'Convertissez le code en superbes images de partage avec une prise en charge multilingue et multithème',
      },
      placeholder: 'Tapez ou collez le code ici...',
      formatBtn: 'Format',
      sampleBtn: 'Charger un échantillon',
      copyBtn: "Copier l'image",
      downloadBtn: "Télécharger l'image",
      tipPrefix: 'Conseil:',
      tipBody:
        "La coloration syntaxique multilingue s'affiche au fur et à mesure que vous tapez — aucune étape supplémentaire n'est nécessaire.",
      renderError: 'Échec du rendu',
    },
    base64: {
      title: 'Encodage/Décodage Base64 : Texte et fichier en ligne | WizGo',
      description:
        "Encodeur/décodeur Base64 gratuit en ligne — texte et fichiers, aperçu d'image, téléchargement binaire. Fonctionne dans votre navigateur, aucun téléchargement.",
      h1: 'Encodage/décodage Base64',
      subheading:
        "Texte/fichier ↔ Base64 · prend en charge les images, le texte et les binaires · s'exécute localement",
      schema: {
        name: 'Encodage/décodage Base64',
        description:
          'Convertisseur texte/fichier ↔ Base64 prenant en charge les images, le texte et le binaire',
      },
      tabs: {
        encode: 'Encoder',
        decode: 'Décoder',
      },
      labels: {
        inputEncode: 'Saisir du texte',
        inputDecode: "Base d'entrée64",
        outputEncode: 'Sortie Base64',
        outputDecode: 'Sortie décodée',
        imagePreview: "Aperçu de l'image",
        imageAlt: 'Aperçu',
      },
      placeholders: {
        inputEncode: 'Tapez du texte...',
        inputDecode: 'Collez une chaîne Base64...',
        outputEncode: 'Le résultat Base64 apparaîtra ici...',
        outputDecode: 'Le résultat décodé apparaîtra ici...',
      },
      clearBtn: 'Clair',
      uploadBtn: 'Télécharger le fichier',
      copyBtn: 'Copie',
      copiedBtn: 'Copié',
      downloadBtn: 'Télécharger le fichier',
      fileSizeLimit: 'Limite de taille de fichier : 5 Mo',
      unknownType: 'type inconnu',
      errors: {
        encodeFail:
          "Échec de l'encodage : le texte contient des caractères qui ne peuvent pas être traités",
        fileReadFail: 'Échec de la lecture du fichier',
        decodeFail: 'Échec du décodage : chaîne Base64 non valide',
        fileTooLargeTemplate:
          'Fichier trop volumineux. 5 Mo maximum, {size} actuelle',
      },
      binaryFileTemplate: '[fichier binaire - {size}]',
      tips: {
        heading: 'Comment utiliser',
        items: [
          'Encoder : saisissez du texte ou téléchargez un fichier – convertit automatiquement en chaîne Base64',
          'Décoder : collez une chaîne Base64 (le préfixe URI des données convient) – décode en texte ou en fichier',
          "Aperçu de l'image : les images décodées s'affichent directement sur la page",
          'Téléchargement de fichiers : les fichiers binaires décodés peuvent être téléchargés directement',
        ],
      },
    },
    jwt: {
      title: 'Décodeur/générateur/vérificateur JWT : HS/RS/ES | WizGo',
      description:
        "Décodez l'en-tête/la charge utile JWT, vérifiez les signatures, générez des jetons en ligne. Prend en charge les algorithmes HS, RS, ES. Fonctionne localement, pas de téléchargements.",
      h1: 'Décoder/Signer/Vérifier JWT',
      subheading: "Jeton Web JSON · HS256 RS256 ES256 · s'exécute localement",
      schema: {
        name: 'Décoder/Signer/Vérifier JWT',
        description:
          "Outil en ligne JSON Web Token prenant en charge les familles d'algorithmes HS/RS/ES — s'exécute localement",
      },
      algoLabel: 'Algorithme de signature',
      encodedLabel: 'Codé · jeton complet',
      encodedPlaceholder: 'header.payload.signature',
      sampleBtn: 'Charger un échantillon',
      copyBtn: 'Copie',
      copiedBtn: 'Copié',
      verify: {
        idle: 'Fournir un jeton et une clé pour vérifier la signature',
        ok: 'Signature vérifiée',
        bad: 'La signature ne correspond pas',
        needSecret: 'Fournir un secret pour vérifier la signature',
        needPubkey: 'Collez une clé publique pour vérifier la signature',
        needSecretForSign: 'Fournir un secret pour générer une signature',
        needPrivkeyForSign: 'Collez une clé privée pour générer une signature',
        signedNoVerify: 'Signé · collez la clé publique/secrète pour vérifier',
        failTemplate: 'Échec de la vérification : {msg}',
      },
      headerLabel: 'En-tête',
      payloadLabel: 'Charge utile',
      secret: {
        label: 'Secret (UTF-8 ou base64)',
        isB64Label: 'le secret est codé en base64',
        placeholder: 'votre secret de 256 bits',
      },
      pubkeyLabel: 'Clé publique (PEM, pour vérification)',
      privkeyLabel: 'Clé privée (PEM, pour la signature)',
      pubkeyPlaceholder:
        '-----DEBUT DE LA CLÉ PUBLIQUE-----\n...\n-----FIN CLÉ PUBLIQUE-----',
      privkeyPlaceholder:
        '-----DEBUT DE LA CLÉ PRIVÉE-----\n...\n-----FIN CLÉ PRIVÉE-----',
      errors: {
        pemEmpty: 'Le contenu PEM est vide',
        jwtFormat: 'Format JWT non valide : header.payload.signature attendu',
        headerB64: "L'en-tête base64 n'est pas valide",
        payloadB64: "La charge utile base64 n'est pas valide",
        headerJson: "L'en-tête n'est pas un JSON valide",
        payloadJson: "La charge utile n'est pas un JSON valide",
        signFailTemplate: 'Échec de la signature : {msg}',
      },
    },
    textWatermark: {
      title:
        "Filigrane de passeport et d'identité : outil d'image anti-fraude | WizGo",
      description:
        "Ajoutez un filigrane « à usage X uniquement » sur les passeports, les permis de conduire et les contrats avant de les envoyer aux banques, aux propriétaires ou au KYC – protection contre la fraude et les droits d'auteur. Fonctionne localement.",
      h1: 'Filigrane de texte d’image',
      subheading:
        "Tamponnez « à usage X uniquement » sur les scans de passeport et d'identité avant le partage · anti-fraude, traçable · fonctionne localement",
      schema: {
        name: 'Filigrane de texte d’image',
        alternateNames: [
          'filigrane de passeport',
          'filigrane de permis de conduire',
          'Filigrane de document KYC',
          "filigrane de texte d'image",
        ],
        description:
          "Ajoutez des filigranes de texte visibles aux images sensibles (numérisations de passeport, copies de permis de conduire, contrats et formulaires signés) afin qu'un destinataire ne puisse pas les réutiliser. Prend en charge les dispositions de tuiles/centre/coin. Traitement pur dans le navigateur.",
        featureList: [
          "Filigrane pour passeport / permis de conduire / numérisation d'identité",
          'Marques dédiées « À usage [à des fins] uniquement »',
          'Dispositions de carrelage/centre/coin',
          "La couleur, la taille, l'opacité et la rotation sont réglables",
          'Traitement dans le navigateur : images jamais téléchargées',
          'Prend en charge PNG/JPG/WebP',
        ],
      },
      howToSchema: {
        name: "Comment filigraner une pièce d'identité ou une image de document avant de le partager",
        description:
          'Tamponnez un filigrane de texte « à usage X uniquement » sur une image en trois étapes pour éviter toute utilisation abusive du document.',
        toolName: 'Navigateur (Chrome / Safari / Edge)',
        steps: [
          {
            name: 'Télécharger une image',
            text: "Cliquez sur la zone de téléchargement ou faites glisser l'image. Prend en charge PNG / JPG / WebP. Les images sont traitées localement et ne sont jamais téléchargées.",
          },
          {
            name: 'Tapez le texte du filigrane',
            text: "Par exemple « Pour la demande de prêt hypothécaire Acme Bank uniquement » ou « Pour la demande de location Globex 2026 ». Indiquez le cas d'utilisation spécifique et le destinataire.",
          },
          {
            name: 'Ajuster le style et télécharger',
            text: "Choisissez la tuile (anti-recadrage), modifiez la couleur, la taille, l'opacité et la rotation, puis cliquez sur télécharger PNG.",
          },
        ],
      },
      faqSchema: {
        items: [
          {
            question:
              "Est-il légal de filigraner mon propre passeport ou ma carte d'identité ?",
            answer:
              "Oui, vous possédez la copie. L'apposition d'un filigrane « à usage X uniquement » sur un scan d'un passeport ou d'un permis de conduire avant de l'envoyer par courrier électronique à un propriétaire, une banque ou un employeur est une pratique antifraude largement recommandée et n'invalide pas le document.",
          },
          {
            question: 'Quel texte le filigrane doit-il contenir ?',
            answer:
              'Incluez trois éléments : objectif + destinataire + date. Par exemple « Pour la demande de prêt hypothécaire Acme Bank 2026 uniquement ». Plus c’est précis, plus il est difficile d’en abuser.',
          },
          {
            question:
              'Quel est l’endroit le plus sûr pour mettre le filigrane ?',
            answer:
              'Le mode Mosaïque est le plus sûr : le texte est disposé en diagonale sur toute l’image et ne peut pas être recadré. Les filigranes de coin sont facilement recadrés. Pour les documents importants, utilisez carrelage + gris semi-transparent.',
          },
          {
            question: 'Mon image sera-t-elle téléchargée sur un serveur ?',
            answer:
              "Non. Tout le traitement s'effectue localement dans votre navigateur (Canvas 2D). Les fichiers image et le texte en filigrane ne quittent jamais votre appareil : le serveur ne fournit que la page statique.",
          },
          {
            question: 'Le filigrane peut-il être supprimé dans Photoshop ?',
            answer:
              'Les filigranes de texte sont des changements de pixels visibles ; un utilisateur expérimenté peut les effacer dans Photoshop, mais cela prend du temps et laisse des traces. Pour une utilisation abusive quotidienne (transfert, scraping, hot-linking), un filigrane textuel est suffisamment dissuasif. Pour des signatures invisibles résistantes à la suppression, utilisez notre outil de filigrane caché.',
          },
          {
            question:
              "L'image filigranée est-elle enregistrée au format JPG ou PNG ?",
            answer:
              'Cet outil exporte PNG (bords de filigrane sans perte et les plus nets). Si le fichier est trop volumineux, exécutez-le via "PNG Compress" pour le réduire davantage.',
          },
        ],
      },
      imageLabel: 'Image',
      dropImage: 'Cliquez ou déposez une image ici',
      formats: 'PNG · JPG · WebP',
      replaceImage: "Remplacer l'image",
      textLabel: 'Texte en filigrane',
      textDefault: "Pour l'usage d'Acme Bank uniquement",
      textPlaceholder:
        'par ex. Pour les demandes de prêt hypothécaire Acme Bank uniquement',
      sizeLabel: 'Taille',
      colorLabel: 'Couleur',
      boldLabel: 'Audacieux',
      swatches: {
        red: 'Rouge',
        white: 'Blanc',
        lightGray: 'Gris clair',
        midGray: 'Gris moyen',
        darkGray: 'Gris foncé',
        charcoal: 'Charbon de bois',
        black: 'Noir',
      },
      customColorTitle: 'Couleur personnalisée',
      opacityLabel: 'Opacité',
      rotationLabel: 'Rotation',
      spacingLabel: 'Espacement',
      patternLabel: 'Mise en page',
      patterns: {
        tile: 'Tuile',
        single: 'Célibataire',
        corner: 'Coin',
      },
      downloadBtn: 'Télécharger PNG',
      copyImageBtn: "Copier l'image",
      useCases: {
        heading: "Cas d'utilisation courants",
        items: [
          {
            title: 'Passeport / permis de conduire · lutte contre la fraude',
            bodyHtml:
              "Les demandes de location, l'intégration bancaire, le KYC sur les échanges cryptographiques et les chèques I-9 pour les nouveaux employeurs vous demandent tous d'envoyer par courrier électronique une analyse d'une pièce d'identité gouvernementale. Le marquage « Pour l'hypothèque Acme Bank 2026 uniquement » empêche que ce scan soit réutilisé pour une fraude sur le prêt ou des ouvertures de compte non autorisées ailleurs. Utilisez le <strong>mode mosaïque</strong> avec une opacité de 30 à 50 %.",
          },
          {
            title: 'Contrats, NDA et formulaires signés',
            bodyHtml:
              "Lors de l'envoi par courrier électronique d'un contrat signé, d'un NDA, d'un W-9 ou d'un bail à une contrepartie, un filigrane « pour [destinataire + objectif] uniquement » restreint la réutilisation ou le transfert ultérieur. Il en va de même pour les factures de services publics et les relevés bancaires utilisés comme justificatif de domicile.",
          },
          {
            title:
              "Justificatif de domicile/revenu auprès d'un propriétaire ou d'un CPA",
            bodyHtml:
              "Les factures de services publics, les fiches de paie et les déclarations de revenus s'infiltrent régulièrement dans les feuilles de calcul des recruteurs et dans les bases de données des propriétaires. Un filigrane du type « Pour une demande de location au 123 Main St uniquement » rend la réutilisation évidemment suspecte.",
          },
          {
            title:
              "Protection des droits d'auteur pour les photos et les illustrations",
            bodyHtml:
              "L'ajout d'une signature ou d'un domaine aux photos, photos de produits et illustrations avant de les publier sur les plateformes sociales réduit considérablement le vol direct. Utilisez le <strong>coin</strong> pour les marques de droit d'auteur subtiles ; <strong>carrelage</strong> pour une forte couverture antivol.",
          },
        ],
      },
      steps: {
        heading: 'Comment utiliser',
        itemsHtml: [
          "<strong>Télécharger l'image</strong> : cliquez sur la zone de téléchargement ou faites glisser le fichier. Prend en charge PNG / JPG / WebP. Les images sont traitées localement et ne sont jamais téléchargées.",
          '<strong>Tapez le texte du filigrane</strong> : indiquez explicitement le but et le destinataire, par ex. "Pour la demande de prêt hypothécaire Acme Bank uniquement" ou "Pour la demande de location 123 Main St 2026". Plus c’est précis, plus il est difficile d’en abuser.',
          '<strong>Ajuster le style</strong> : choisissez une disposition (le carreau est le plus résistant aux recadrages), une couleur (rouge pour une forte accentuation, gris pour une marque plus subtile), une taille, une opacité et une rotation. Prévisualisez les mises à jour en direct.',
          '<strong>Télécharger PNG</strong> : cliquez sur le bouton de téléchargement pour enregistrer localement, ou utilisez "Copier l\'image" pour la coller directement dans un e-mail ou dans un chat.',
        ],
      },
      faq: {
        heading: 'FAQ',
        items: [
          {
            q: "Est-il légal de filigraner mon propre passeport ou ma carte d'identité ?",
            aHtml:
              "Oui, vous possédez la copie. L'apposition d'un filigrane « à usage X uniquement » sur un scan d'un passeport ou d'un permis de conduire avant de l'envoyer par courrier électronique à un propriétaire, une banque ou un employeur est une pratique antifraude largement recommandée et n'invalide pas le document.",
          },
          {
            q: 'Quel texte le filigrane doit-il contenir ?',
            aHtml:
              "Incluez trois éléments : objectif + destinataire + date. Par exemple « Pour l'hypothèque Acme Bank 2026 uniquement » ou « Pour la demande de location du 123 Main St — avril 2026 ». Plus c’est précis, plus il est difficile d’en abuser.",
          },
          {
            q: 'Quel est l’endroit le plus sûr pour mettre le filigrane ?',
            aHtml:
              "Le mode Mosaïque est le plus sûr : le texte est disposé en diagonale sur toute l’image et ne peut pas être recadré. Les filigranes de coin sont facilement recadrés. Pour les documents d'identité ou les cartes bancaires, utilisez le carreau + gris semi-transparent pour plus de sécurité et de lisibilité.",
          },
          {
            q: 'Mon image sera-t-elle téléchargée sur un serveur ?',
            aHtml:
              "Non. Tout le traitement s'effectue localement dans votre navigateur (Canvas 2D dessine directement les pixels). Les fichiers image et le texte en filigrane ne quittent jamais votre appareil. Vous pouvez même utiliser cet outil hors ligne.",
          },
          {
            q: 'Le filigrane peut-il être supprimé dans Photoshop ?',
            aHtml:
              'Les filigranes de texte sont des changements de pixels visibles ; un utilisateur expérimenté peut les effacer dans Photoshop, mais cela prend du temps et laisse des traces. Pour une utilisation abusive quotidienne (transfert, scraping, hot-linking), un filigrane textuel est suffisamment dissuasif. Pour les signatures invisibles résistantes à la suppression, utilisez notre outil <a href="/en/watermark" class="text-[#0072f5] hover:underline">Filigrane caché</a>.',
          },
          {
            q: "Que faire si l'image filigranée est trop grande ?",
            aHtml:
              'Cet outil exporte PNG (sans perte, bords les plus nets). Si le fichier est trop volumineux pour être téléchargé ou envoyé, exécutez-le via <a href="/en/compress-png" class="text-[#0072f5] hover:underline">PNG Compress</a> pour le réduire davantage, ou utilisez <a href="/en/png-to-jpg" class="text-[#0072f5] hover:underline">PNG vers JPG</a> pour passer à un format plus petit.',
          },
        ],
      },
    },
    json: {
      title: 'Formateur JSON : embellir, réduire, valider | WizGo',
      description:
        "Formateur JSON en ligne gratuit : embellissez, réduisez, validez avec une copie en un clic. S'exécute dans votre navigateur, les données collées ne sont jamais téléchargées.",
      h1: 'Formateur JSON',
      subheading: "Embellir, réduire, valider JSON · s'exécute localement",
      schema: {
        name: 'Formateur JSON',
        description:
          "JSON embellit, réduit et valide – s'exécute localement, pas de téléchargement",
      },
      inputLabel: 'Saisir JSON',
      formatBtn: 'Embellir',
      minifyBtn: 'Réduire',
      clearBtn: 'Clair',
      inputPlaceholder: '{"exemple": "Collez les données JSON ici"}',
      resultLabel: 'Résultat',
      copyBtn: 'Copie',
      copiedBtn: 'Copié',
      outputPlaceholder: 'Le JSON formaté apparaîtra ici',
      formatError: 'JSON invalide — veuillez vérifier votre saisie',
    },
    hash: {
      title: 'Générateur de hachage : SHA-256, SHA-512 en ligne | WizGo',
      description:
        "Générez des hachages SHA-1, SHA-256, SHA-384, SHA-512 pour le texte et les fichiers dans votre navigateur. Vérifiez les téléchargements, vérifiez l'intégrité : rien ne quitte votre appareil.",
      h1: 'Générateur de hachage',
      subheading:
        "Vérifiez l'intégrité du fichier ou hachez n'importe quel texte · SHA-1 / SHA-256 / SHA-384 / SHA-512 · s'exécute dans votre navigateur",
      schema: {
        name: 'Générateur de hachage',
        description:
          'Outil en ligne gratuit pour calculer les hachages SHA-1, SHA-256, SHA-384 et SHA-512 pour le texte et les fichiers, le tout localement dans votre navigateur.',
      },
      tabs: {
        text: 'Texte',
        file: 'Déposer',
      },
      input: {
        textLabel: 'Texte à hacher',
        textPlaceholder: "Tapez ou collez n'importe quel texte ici...",
        fileLabel: 'Fichier à hacher',
        fileDrop: 'Déposez un fichier ici',
        fileHint: 'ou cliquez pour choisir un fichier',
        clearBtn: 'Clair',
        fileReplace: 'Choisissez un autre fichier',
        fileSizeHint: "Jusqu'à 2 Go · traité localement, jamais téléchargé",
      },
      output: {
        label: 'Résultats',
        formatLabel: 'Format de sortie',
        hex: 'Hex',
        base64: 'Base64',
        copyBtn: 'Copie',
        copiedBtn: 'Copié',
        computing: 'Informatique...',
        empty:
          'Saisissez du texte ou choisissez un fichier pour voir les hachages',
      },
      algorithms: {
        sha1: 'SHA-1',
        sha256: 'SHA-256',
        sha384: 'SHA-384',
        sha512: 'SHA-512',
      },
      errors: {
        tooLargeTemplate:
          'Le fichier est trop volumineux ({size}). La taille maximale prise en charge est de 2 Go.',
        readFailed: 'Impossible de lire le fichier. Veuillez réessayer.',
        hashFailed:
          'Le hachage a échoué. Votre navigateur peut ne pas prendre en charge cet algorithme.',
      },
      tips: {
        heading: 'À propos des valeurs de hachage',
        items: [
          'Un hachage est une empreinte digitale de longueur fixe de votre contenu : une entrée identique donne toujours un hachage identique.',
          "SHA-256 est le choix le plus courant pour les contrôles d'intégrité des fichiers (par exemple, vérification des téléchargements).",
          'Tout fonctionne dans votre navigateur. Les fichiers et le texte ne quittent jamais votre appareil.',
          "MD5 n'est pas inclus car il n'est plus considéré comme sécurisé – préférez SHA-256 ou plus puissant.",
        ],
      },
    },
    mp4ToMp3: {
      title: 'MP4 en MP3 : vidéo en ligne gratuite vers audio | WizGo',
      description:
        "Extrayez l'audio d'une vidéo et enregistrez-le au format MP3 - gratuitement, instantanément, dans votre navigateur. Aucun téléchargement, aucune inscription, aucune installation.",
      h1: 'Vidéo en MP3',
      subheading:
        "Extrayez l'audio de n'importe quelle vidéo · fonctionne sur votre appareil · rien ne quitte votre ordinateur",
      schema: {
        name: 'Convertisseur MP4 en MP3',
        description:
          "Outil en ligne gratuit pour extraire l'audio des vidéos MP4 et l'enregistrer au format MP3 — s'exécute dans votre navigateur, sans téléchargement.",
      },
      upload: {
        drag: 'Déposez une vidéo ici',
        orClick: 'ou cliquez pour choisir un fichier (MP4, MOV, M4A, WebM)',
        sizeHint: "Jusqu'à 500 Mo · un fichier à la fois",
      },
      options: {
        bitrateLabel: 'Qualité sonore :',
        k128: 'Norme · 128k',
        k192: 'Recommandé · 192k',
        k256: 'Élevé · 256k',
        k320: 'Meilleur · 320k',
        start: 'Obtenir MP3',
      },
      progress: {
        preparing: 'Se préparer...',
        decoding: "Lecture de l'audio...",
        encodingTemplate: 'Conversion · {pct} %',
        done: 'Fait!',
      },
      errors: {
        tooLargeTemplate:
          'Ce fichier est trop gros. La taille maximale est de 500 Mo (la vôtre est de {size}).',
        decodeFailedSafari:
          "Safari n'a pas pu lire ce fichier. Veuillez mettre à jour Safari ou essayer dans Chrome ou Firefox.",
        decodeFailedGeneric:
          "Impossible de lire l'audio de ce fichier. Le format à l'intérieur peut être inhabituel.",
      },
      result: {
        ready: 'Votre MP3 est prêt – prévisualisez ou téléchargez ci-dessous',
        downloadBtn: 'Télécharger',
        sizeTemplate: 'Taille : {size}',
      },
      faq: {
        heading: 'Questions courantes',
        items: [
          {
            q: 'Ma vidéo sera-t-elle téléchargée quelque part ?',
            a: 'Non. Tout se passe ici, dans votre navigateur. Le fichier ne quitte jamais votre ordinateur.',
          },
          {
            q: 'Quels types de vidéos fonctionnent ?',
            a: "La plupart des vidéos de tous les jours : MP4 (le plus courant), MOV depuis iPhone, audio M4A et WebM. Si un fichier ne fonctionne pas, l'audio qu'il contient est dans un format inhabituel.",
          },
          {
            q: 'Pourquoi cela échoue-t-il parfois sur Safari ?',
            a: "Les anciens Safari ne peuvent pas lire l'audio de certains fichiers MP4. Mettez à jour Safari ou ouvrez la page dans Chrome, Firefox ou Edge.",
          },
          {
            q: 'Y a-t-il une limite de taille ?',
            a: 'Oui – 500 Mo par fichier. Tout ce qui est plus gros peut geler votre navigateur, surtout sur un téléphone.',
          },
          {
            q: 'Puis-je convertir plusieurs vidéos à la fois ?',
            a: "Pas encore. Pour l'instant, faites-les un par un.",
          },
        ],
      },
    },
    compressMp3: {
      title:
        'Compresser des MP3 en ligne - Réduire la taille du fichier audio | WizGo',
      description:
        "Réduisez les fichiers MP3 en les réencodant à un débit binaire inférieur – gratuitement, instantanément, dans votre navigateur. Pas de téléchargements, pas d'inscription.",
      h1: 'Compresseur MP3',
      subheading:
        "Réduisez les fichiers MP3 en les réencodant à un débit inférieur · fonctionne sur votre appareil · rien n'est téléchargé",
      schema: {
        name: 'Compresseur MP3',
        description:
          "Outil en ligne gratuit pour compresser des fichiers MP3 en les réencodant à un débit inférieur. S'exécute dans votre navigateur avec WebAssembly.",
      },
      upload: {
        drag: 'Déposez un fichier audio ici',
        orClick: 'ou cliquez pour choisir (MP3, M4A, WAV, FLAC, OGG)',
        sizeHint: "Jusqu'à 500 Mo · un fichier à la fois",
      },
      options: {
        bitrateLabel: 'Débit cible :',
        k64: 'Voix · 64k',
        k96: 'Musique · 96k',
        k128: 'Norme · 128k',
        k192: 'Élevé · 192k',
        start: 'Compresse',
      },
      progress: {
        preparing: 'Se préparer...',
        decoding: "Lecture de l'audio...",
        encodingTemplate: 'Compression · {pct} %',
        done: 'Fait!',
      },
      errors: {
        tooLargeTemplate:
          'Ce fichier est trop gros. La taille maximale est de 500 Mo (la vôtre est de {size}).',
        decodeFailedSafari:
          "Safari n'a pas pu lire ce fichier. Veuillez mettre à jour Safari ou essayer dans Chrome ou Firefox.",
        decodeFailedGeneric: "Impossible de lire l'audio de ce fichier.",
      },
      result: {
        ready: 'Votre MP3 compressé est prêt',
        downloadBtn: 'Télécharger',
        sizeTemplate: 'Taille : {size}',
        reductionTemplate: "{pct} % d'économie · {before} → {after}",
      },
      faq: {
        heading: 'Questions courantes',
        items: [
          {
            q: 'Dans quelle mesure mon MP3 sera-t-il plus petit ?',
            a: "Cela dépend du débit binaire d'origine. Un MP3 à 320 kbps compressé à 128 kbps est réduit d'environ 60 %. Un débit de 192 kbps à 96 kbps permet d'économiser environ 50 %.",
          },
          {
            q: 'La qualité va-t-elle baisser ?',
            a: 'Oui, mais cela dépend du débit cible. 128 Kbps semble presque original pour la plupart des musiques, 96 Kbps sont acceptables pour le streaming, 64 Kbps sont uniquement destinés aux enregistrements vocaux.',
          },
          {
            q: 'Mon audio est-il téléchargé ?',
            a: 'Non. Tout se passe dans votre navigateur avec WebAssembly. Le fichier ne quitte jamais votre appareil.',
          },
          {
            q: 'Puis-je également utiliser des fichiers WAV ou FLAC ?',
            a: 'Oui. Tout format que votre navigateur peut décoder (WAV, FLAC, M4A, OGG) sera converti en MP3 au débit binaire choisi.',
          },
          {
            q: 'Quelle est la taille maximale d’un fichier ?',
            a: '500 Mo par fichier. Les fichiers plus volumineux peuvent geler votre navigateur, en particulier sur mobile.',
          },
        ],
      },
    },
    password: {
      title:
        'Générateur de mots de passe – Créez des mots de passe aléatoires forts | WizGo',
      description:
        "Générateur de mots de passe en ligne gratuit. Créez des mots de passe aléatoires forts avec une longueur et des types de caractères personnalisables (majuscules, minuscules, chiffres, symboles). Excluez les caractères similaires et ambigus. S'exécute localement dans votre navigateur.",
      h1: 'Générateur de mot de passe',
      subheading:
        "Générez des mots de passe aléatoires forts · personnalisez la longueur et les types de caractères · s'exécute localement",
      schema: {
        name: 'Générateur de mot de passe',
        description:
          'Générez des mots de passe aléatoires forts avec des options personnalisables',
      },
      modeLabel: 'Type de mot de passe',
      mode: {
        random: 'Mot de passe aléatoire',
        passphrase: 'Phrase secrète',
      },
      lengthLabel: 'Longueur du mot de passe',
      wordCountLabel: 'Nombre de mots',
      charTypesLabel: 'Types de caractères',
      charTypes: {
        uppercase: 'Majuscules (A-Z)',
        lowercase: 'Minuscules (a-z)',
        numbers: 'Chiffres (0-9)',
        symbols: 'Symboles ($!@#$%)',
      },
      separatorLabel: 'Séparateur',
      separators: {
        hyphen: "Trait d'union (-)",
        underscore: 'Souligner (_)',
        space: 'Espace ( )',
        period: 'Période (.)',
        number: 'Nombre aléatoire',
      },
      advanced: {
        label: 'Options avancées',
        excludeSimilar:
          'Exclure les caractères similaires (i, l, 1, L, o, 0, O)',
        excludeAmbiguous:
          'Exclure les symboles ambigus ({ } [ ] ( ) / \\ \' " ` ~ , ; : . < >)',
      },
      generateBtn: 'Générer un mot de passe',
      copyBtn: 'Copie',
      copiedBtn: 'Copié',
      regenerateBtn: 'Régénérer',
      resultLabel: 'Mot de passe généré',
      strength: {
        label: 'Force du mot de passe',
        weak: 'Faible',
        fair: 'Équitable',
        good: 'Bien',
        strong: 'Fort',
      },
      info: {
        heading: 'Conseils de sécurité des mots de passe',
        body: 'Les mots de passe plus longs sont plus sécurisés. Nous recommandons au moins 12 caractères avec un mélange de majuscules, minuscules, chiffres et symboles. Ne réutilisez jamais les mots de passe sur plusieurs sites. Pensez à utiliser un gestionnaire de mots de passe pour stocker vos mots de passe générés.',
      },
    },
    pdfCompress: {
      title:
        'Compresser PDF : réduire la taille du fichier PDF en ligne | WizGo',
      description:
        'Compresseur PDF en ligne gratuit. Réduit la taille du fichier en réécrivant les flux d’objets et en supprimant les métadonnées. Fonctionne entièrement dans votre navigateur – rien n’est téléchargé.',
      h1: 'Compresser un PDF',
      subheading:
        "Réduire la taille du fichier PDF · s'exécute localement · rien n'est téléchargé",
      schema: {
        name: 'Compresser un PDF',
        description:
          "Outil en ligne gratuit pour compresser des fichiers PDF en réécrivant les flux d'objets et en supprimant les métadonnées. Fonctionne entièrement dans le navigateur.",
        browserReq:
          "Navigateur moderne avec prise en charge de l'API de fichiers",
      },
      upload: {
        drag: 'Déposez les fichiers PDF ici',
        orClick: 'ou cliquez pour télécharger',
        pasteHint: 'ou appuyez sur ⌘V / Ctrl+V pour coller',
        sizeHint: "Jusqu'à 200 Mo par fichier · Prise en charge par lots",
      },
      options: {
        stripMetadataLabel: 'Supprimer les métadonnées',
        stripMetadataHint:
          "Supprimer le titre, l'auteur, les mots-clés et les informations sur le producteur",
        objectStreamNote:
          "La compression du flux d'objets est toujours activée. Les images intégrées ne sont pas réencodées dans cette version : attendez-vous à des économies de 5 à 15 %.",
        start: 'Compresse',
      },
      progress: {
        preparing: 'Préparation...',
        processingTemplate: 'Traitement · {cur}/{total}',
        done: 'Fait',
      },
      result: {
        ready: 'Comprimé',
        downloadBtn: 'Télécharger',
        sizeTemplate: 'Taille : {size}',
        reductionTemplate: "{pct} % d'économie · {before} → {after}",
        noReduction:
          'Aucune réduction supplémentaire possible — original retourné',
      },
      errors: {
        tooLargeTemplate:
          '{name} est trop volumineux : maximum 200 Mo ({size} actuelle)',
        notPdfTemplate: "{name} n'est pas un fichier PDF",
        loadFailedTemplate: 'Impossible de lire le PDF : {name}',
        encryptedPdf:
          'Les PDF cryptés ou protégés par mot de passe ne sont pas pris en charge',
      },
      faq: {
        heading: 'FAQ',
        items: [
          {
            q: 'Dans quelle mesure mon PDF sera-t-il plus petit ?',
            a: "Généralement 5 à 15 %, selon la source. Les PDF déjà optimisés ont moins de place pour être réduits. Les PDF contenant beaucoup d'images en bénéficieront bien plus une fois que le réencodage des images sera disponible dans la V2 (projeté de 50 à 80 %).",
          },
          {
            q: 'La qualité va-t-elle baisser ?',
            a: "Non. La V1 réécrit uniquement les flux d'objets et supprime les métadonnées : les images, les polices et le texte conservent des pixels identiques. Les économies sont purement structurelles.",
          },
          {
            q: 'Mon fichier est-il téléchargé ?',
            a: "Non. Tout s'exécute dans votre navigateur avec pdf-lib : le fichier ne quitte jamais votre appareil.",
          },
          {
            q: 'Les PDF cryptés sont-ils pris en charge ?',
            a: "Pas dans la V1. Les PDF protégés par mot de passe génèrent une erreur : supprimez d'abord la protection.",
          },
          {
            q: 'Pourquoi la production augmente-t-elle parfois ?',
            a: "Pour les originaux hautement optimisés, la réécriture peut ajouter quelques Ko. Lorsque cela se produit, l'outil affiche « aucune réduction supplémentaire » et vous permet de télécharger l'original.",
          },
        ],
      },
    },
    pdfMerge: {
      title: 'Fusion de PDF : combinez plusieurs PDF en ligne | WizGo',
      description:
        "Fusion de PDF en ligne gratuite. Combinez plusieurs PDF en un seul, réorganisez-les avec les boutons haut/bas. S'exécute dans votre navigateur - rien n'est téléchargé.",
      h1: 'Fusion PDF',
      subheading:
        "Combinez plusieurs PDF en un seul · réorganisez avant de fusionner · s'exécute localement",
      schema: {
        name: 'Fusion PDF',
        description:
          'Outil en ligne gratuit pour fusionner plusieurs PDF en un seul document, avec contrôles de classement. Fonctionne entièrement dans le navigateur.',
        browserReq:
          "Navigateur moderne avec prise en charge de l'API de fichiers",
      },
      upload: {
        drag: 'Déposez les fichiers PDF ici',
        orClick: 'ou cliquez pour télécharger (plusieurs pris en charge)',
        pasteHint: 'ou appuyez sur ⌘V / Ctrl+V pour coller',
        sizeHint: "Jusqu'à 200 Mo par fichier",
        multipleHint: 'Téléchargez au moins 2 PDF à fusionner',
      },
      list: {
        emptyHint: 'Téléchargez au moins 2 PDF pour commencer',
        moveUpAria: 'Monter',
        moveDownAria: 'Descendre',
        removeAria: 'Retirer',
        positionTemplate: '{i}/{total}',
      },
      options: {
        mergeBtn: 'Fusionner des PDF',
        clearAllBtn: 'Tout effacer',
        minFilesHint: 'Au moins 2 fichiers sont nécessaires pour fusionner',
      },
      progress: {
        preparing: 'Préparation...',
        loadingTemplate: 'Chargement · {cur}/{total}',
        writing: 'En écrivant...',
        done: 'Fait',
      },
      result: {
        ready: 'Fusionné',
        downloadBtn: 'Télécharger',
        sizeTemplate: 'Taille : {size}',
        pageCountTemplate: '{pages} pages au total',
      },
      errors: {
        tooLargeTemplate:
          '{name} est trop volumineux : maximum 200 Mo ({size} actuelle)',
        notPdfTemplate: "{name} n'est pas un fichier PDF",
        loadFailedTemplate: 'Impossible de lire le PDF : {name}',
        encryptedPdf:
          'Les PDF cryptés ou protégés par mot de passe ne sont pas pris en charge',
        needTwoFiles: 'Au moins 2 PDF sont requis',
      },
      faq: {
        heading: 'FAQ',
        items: [
          {
            q: 'Mon fichier est-il téléchargé ?',
            a: "Non. Tout s'exécute dans votre navigateur avec pdf-lib : les fichiers ne quittent jamais votre appareil.",
          },
          {
            q: 'Y a-t-il une limite de nombre de fichiers ?',
            a: 'Pas de limite stricte, mais la fusion de plus de 20 fichiers volumineux peut ralentir le navigateur, en particulier sur mobile.',
          },
          {
            q: 'Puis-je réorganiser les fichiers ?',
            a: "Oui. Utilisez les boutons ▲ / ▼ à côté de chaque fichier. Les pages PDF fusionnées suivent l'ordre de la liste.",
          },
          {
            q: 'Les PDF cryptés sont-ils pris en charge ?',
            a: "Pas dans la V1. Les PDF protégés par mot de passe génèrent une erreur : supprimez d'abord la protection.",
          },
          {
            q: 'Les signets et les liens survivent-ils à la fusion ?',
            a: 'La V1 préserve uniquement le contenu de la page : les signets au niveau du document, les champs de formulaire et les annotations de liens peuvent être supprimés.',
          },
        ],
      },
    },
  },
};
