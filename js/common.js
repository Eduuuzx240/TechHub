@@ .. @@
 // Demo users
 const demoUsers = {
-    'admin@techhub.com': {
-        id: '1',
-        name: 'Admin TechHUB',
-        email: 'admin@techhub.com',
-        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
-        role: 'admin',
-        accountType: 'individual',
-        createdAt: new Date().toISOString(),
-    },
     'empresa@techhub.com': {
         id: '2',
         name: 'João Silva',
@@ -58,6 +48,19 @@ const demoUsers = {
         },
         createdAt: new Date().toISOString(),
     },
+    'techcorp@techhub.com': {
+        id: '3',
+        name: 'Maria Santos',
+        email: 'techcorp@techhub.com',
+        avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
+        role: 'admin',
+        accountType: 'company',
+        company: {
+            name: 'TechCorp Innovations',
+            cnpj: '98.765.432/0001-10',
+            size: 'large',
+            industry: 'Software',
+        },
+        createdAt: new Date().toISOString(),
+    },
 };
 
@@ .. @@
     
     const user = demoUsers[credentials.email];
     
-    if (user && credentials.password === 'admin123' && user.accountType === credentials.accountType) {
+    if (user && credentials.password === 'admin123' && credentials.accountType === 'company') {
         currentUser = user;
         isAuthenticated = true;
         localStorage.setItem('techhub_user', JSON.stringify(user));
@@ .. @@
     const data = {
         name: formData.get('name'),
         email: formData.get('email'),
         password: formData.get('password'),
         confirmPassword: formData.get('confirmPassword'),
-        accountType: formData.get('accountType')
+        accountType: 'company',
+        company: formData.get('company')
     };
 
@@ .. @@
     const user = {
         id: Date.now().toString(),
         name: data.name,
         email: data.email,
         role: 'user',
-        accountType: data.accountType,
-        company: data.company,
+        accountType: 'company',
+        company: data.company || {
+            name: '',
+            cnpj: '',
+            size: 'startup',
+            industry: '',
+        },
         createdAt: new Date().toISOString(),
     };