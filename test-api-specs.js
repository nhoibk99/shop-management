// Test script to verify API response includes specifications
const fetch = require('node-fetch');

async function testProductAPI() {
    try {
        console.log('🧪 Testing Product API with specifications...\n');
        
        // Test getting a specific product
        const response = await fetch('http://localhost:8080/api/v1/products/1');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const product = await response.json();
        
        console.log('✅ Product API Response:');
        console.log('📱 Product Name:', product.name);
        console.log('💰 Price:', product.price);
        console.log('🏷️  Condition:', product.condition);
        
        // Check specifications
        if (product.specifications) {
            console.log('\n📋 Specifications:');
            Object.entries(product.specifications).forEach(([key, value]) => {
                console.log(`   ${key}: ${value}`);
            });
        } else {
            console.log('\n❌ No specifications found');
        }
        
        // Check other fields
        if (product.images && product.images.length > 0) {
            console.log('\n🖼️  Images:', product.images.length, 'images');
        }
        
        if (product.tags && product.tags.length > 0) {
            console.log('\n🏷️  Tags:', product.tags.join(', '));
        }
        
        if (product.reviews && product.reviews.length > 0) {
            console.log('\n⭐ Reviews:', product.reviews.length, 'reviews');
        }
        
        if (product.warrantyAndReturnPolicy) {
            console.log('\n🛡️  Warranty:', product.warrantyAndReturnPolicy.substring(0, 50) + '...');
        }
        
        console.log('\n✅ API test completed successfully!');
        
    } catch (error) {
        console.error('❌ Error testing API:', error.message);
    }
}

// Run the test
testProductAPI();
