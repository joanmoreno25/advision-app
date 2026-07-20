# AdVision 🚀
### Intelligent Advertising File Cataloging System

**AdVision** is a full-stack web platform designed to streamline advertising agency workflows. It utilizes advanced artificial intelligence to automatically classify images, perform Optical Character Recognition (OCR), detect sensitive content, and analyze sentiment via Natural Language Processing (NLP).

---

## 🎨 Overview
AdVision centralizes the management of advertising assets, providing a modern interface to analyze, filter, and export data-driven reports for team collaboration and decision-making.

---

## ✨ Key Features
*   **AI-Powered Analysis**: Utilizes **AWS Rekognition** to detect general labels, properties, text (OCR), and moderation labels.
*   **NLP Insights**: Implements **AWS Comprehend** to perform sentiment analysis on detected text, providing positive, negative, or mixed insights.
*   **Secure Cloud Storage**: Handles media storage using **AWS S3** for both original files and auto-generated thumbnails.
*   **Data Persistence**: Real-time storage of analysis history and user metadata via **Firebase Firestore**.
*   **Comprehensive Exporting**: Built-in support for generating reports in **PDF** (via jsPDF), **Excel**, **CSV**, and **JSON** formats.
*   **User Experience**: Features include dark mode support, internationalization (i18next), and an infinite scrolling dashboard for performance.

---

## 🛠️ Tech Stack
| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Tailwind CSS, React Router, Recharts |
| **Backend / Auth** | Firebase (Firestore, Auth) |
| **Cloud Services** | AWS (S3, Rekognition, Comprehend, Cognito, IAM) |
| **Utilities** | jsPDF, html2canvas, SheetJS (XLSX) |

---

## 🎓 Academic Recognition
This project was developed by Joan Moreno Martin as part of the Interactive Communication degree's Final Degree Project (TFG).

**Built with 💙 to optimize the future of advertising.**