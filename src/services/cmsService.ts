import { CmsContentSchema } from '../types';
import { defaultCmsData } from '../data/cmsData';

// Keys used for local storage simulation and dynamic edits
const CMS_STORAGE_KEY = 'ideat_tech_cms_content';
const CONFIG_STORAGE_KEY = 'ideat_tech_cms_config';

/**
 * Service representing standard headless CMS integrations
 */
export const cmsService = {
  /**
   * Retrieves active config
   */
  getConfig() {
    try {
      const saved = localStorage.getItem(CONFIG_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to load CMS config", e);
    }
    return {
      useExternalApi: false,
      apiUrl: 'https://api.ideat.tech/v1/cms-content',
      lastFetchedAt: null,
      isLoading: false,
      connectionError: null
    };
  },

  /**
   * Saves active config
   */
  saveConfig(config: any) {
    localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(config));
  },

  /**
   * Gets the active page content schema
   */
  async fetchContent(): Promise<CmsContentSchema> {
    const config = this.getConfig();

    // If simulating external CMS API or if there's a real API URL
    if (config.useExternalApi && config.apiUrl) {
      try {
        // Real fetch template structure
        const response = await fetch(config.apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${import.meta.env.VITE_CMS_API_TOKEN || ''}`
          }
        });
        
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
        }
        
        const data = await response.json();
        // Return valid response, casting to schema
        return data as CmsContentSchema;
      } catch (err: any) {
        console.error("External CMS fetch failed. Falling back to draft/stored contents.", err);
        throw new Error(err.message || "Failed to reach CMS endpoint");
      }
    }

    // Default simulation delay for realistic loading experience
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Fallback to local custom overrides or raw defaults
    try {
      const stored = localStorage.getItem(CMS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Safely merge products if they are missing in old cached localStorage schema
        if (!parsed.products) {
          parsed.products = defaultCmsData.products;
        }
        return parsed;
      }
    } catch {
      // Ignored
    }

    return defaultCmsData;
  },

  /**
   * Saves custom overrides in localStorage (simulating dynamic CMS editor updates)
   */
  saveLocalContent(content: CmsContentSchema) {
    localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(content));
  },

  /**
   * Restores original Swiss Minimalist mock contents
   */
  resetToDefaults() {
    localStorage.removeItem(CMS_STORAGE_KEY);
    return defaultCmsData;
  }
};
