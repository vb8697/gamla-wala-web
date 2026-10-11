export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      addresses: {
        Row: {
          city: string
          country_code: string
          created_at: string
          id: string
          is_default: boolean
          landmark: string | null
          line1: string
          line2: string | null
          phone: string
          postal_code: string
          recipient_name: string
          state: string
          updated_at: string
          user_id: string
        }
        Insert: {
          city: string
          country_code?: string
          created_at?: string
          id?: string
          is_default?: boolean
          landmark?: string | null
          line1: string
          line2?: string | null
          phone: string
          postal_code: string
          recipient_name: string
          state: string
          updated_at?: string
          user_id: string
        }
        Update: {
          city?: string
          country_code?: string
          created_at?: string
          id?: string
          is_default?: boolean
          landmark?: string | null
          line1?: string
          line2?: string | null
          phone?: string
          postal_code?: string
          recipient_name?: string
          state?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          is_active: boolean
          name: string
          parent_id: string | null
          slug: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          name: string
          parent_id?: string | null
          slug: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          name?: string
          parent_id?: string | null
          slug?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      coupons: {
        Row: {
          code: string
          created_at: string
          description: string | null
          discount_type: string
          discount_value: number
          id: string
          is_active: boolean
          max_discount_paise: number | null
          min_cart_paise: number
          times_used: number
          usage_limit: number | null
          valid_until: string | null
        }
        Insert: {
          code: string
          created_at?: string
          description?: string | null
          discount_type: string
          discount_value: number
          id?: string
          is_active?: boolean
          max_discount_paise?: number | null
          min_cart_paise?: number
          times_used?: number
          usage_limit?: number | null
          valid_until?: string | null
        }
        Update: {
          code?: string
          created_at?: string
          description?: string | null
          discount_type?: string
          discount_value?: number
          id?: string
          is_active?: boolean
          max_discount_paise?: number | null
          min_cart_paise?: number
          times_used?: number
          usage_limit?: number | null
          valid_until?: string | null
        }
        Relationships: []
      }
      hold_items: {
        Row: {
          created_at: string
          hold_id: string
          id: string
          locked_price_paise: number
          quantity: number
          store_id: string
          variant_id: string
        }
        Insert: {
          created_at?: string
          hold_id: string
          id?: string
          locked_price_paise: number
          quantity: number
          store_id: string
          variant_id: string
        }
        Update: {
          created_at?: string
          hold_id?: string
          id?: string
          locked_price_paise?: number
          quantity?: number
          store_id?: string
          variant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "hold_items_hold_id_fkey"
            columns: ["hold_id"]
            isOneToOne: false
            referencedRelation: "holds"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hold_items_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hold_items_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "product_variants"
            referencedColumns: ["id"]
          },
        ]
      }
      holds: {
        Row: {
          created_at: string
          expires_at: string
          id: string
          session_id: string | null
          status: Database["public"]["Enums"]["hold_status"]
          total_paise: number
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          expires_at: string
          id?: string
          session_id?: string | null
          status?: Database["public"]["Enums"]["hold_status"]
          total_paise?: number
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          expires_at?: string
          id?: string
          session_id?: string | null
          status?: Database["public"]["Enums"]["hold_status"]
          total_paise?: number
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      inventory: {
        Row: {
          quantity_held: number
          quantity_on_hand: number
          quantity_reserved: number
          store_id: string
          updated_at: string
          variant_id: string
        }
        Insert: {
          quantity_held?: number
          quantity_on_hand?: number
          quantity_reserved?: number
          store_id: string
          updated_at?: string
          variant_id: string
        }
        Update: {
          quantity_held?: number
          quantity_on_hand?: number
          quantity_reserved?: number
          store_id?: string
          updated_at?: string
          variant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "inventory_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "product_variants"
            referencedColumns: ["id"]
          },
        ]
      }
      order_items: {
        Row: {
          created_at: string
          id: string
          line_total_paise: number
          order_id: string
          product_name: string
          quantity: number
          sku: string
          unit_price_paise: number
          variant_id: string | null
          variant_name: string
        }
        Insert: {
          created_at?: string
          id?: string
          line_total_paise: number
          order_id: string
          product_name: string
          quantity: number
          sku: string
          unit_price_paise: number
          variant_id?: string | null
          variant_name: string
        }
        Update: {
          created_at?: string
          id?: string
          line_total_paise?: number
          order_id?: string
          product_name?: string
          quantity?: number
          sku?: string
          unit_price_paise?: number
          variant_id?: string | null
          variant_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "product_variants"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          billing_address: Json | null
          coupon_code: string | null
          created_at: string
          currency: string
          customer_note: string | null
          discount_paise: number
          hold_id: string | null
          id: string
          order_number: string
          payment_status: Database["public"]["Enums"]["payment_status"]
          shipping_address: Json
          shipping_paise: number
          status: Database["public"]["Enums"]["order_status"]
          subtotal_paise: number
          tax_paise: number
          total_paise: number
          updated_at: string
          user_id: string | null
        }
        Insert: {
          billing_address?: Json | null
          coupon_code?: string | null
          created_at?: string
          currency?: string
          customer_note?: string | null
          discount_paise?: number
          hold_id?: string | null
          id?: string
          order_number: string
          payment_status?: Database["public"]["Enums"]["payment_status"]
          shipping_address: Json
          shipping_paise?: number
          status?: Database["public"]["Enums"]["order_status"]
          subtotal_paise?: number
          tax_paise?: number
          total_paise?: number
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          billing_address?: Json | null
          coupon_code?: string | null
          created_at?: string
          currency?: string
          customer_note?: string | null
          discount_paise?: number
          hold_id?: string | null
          id?: string
          order_number?: string
          payment_status?: Database["public"]["Enums"]["payment_status"]
          shipping_address?: Json
          shipping_paise?: number
          status?: Database["public"]["Enums"]["order_status"]
          subtotal_paise?: number
          tax_paise?: number
          total_paise?: number
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount_paise: number
          created_at: string
          currency: string
          id: string
          order_id: string
          provider: string
          provider_order_id: string | null
          provider_payment_id: string | null
          provider_signature: string | null
          raw_payload: Json | null
          status: Database["public"]["Enums"]["payment_status"]
          updated_at: string
        }
        Insert: {
          amount_paise: number
          created_at?: string
          currency?: string
          id?: string
          order_id: string
          provider?: string
          provider_order_id?: string | null
          provider_payment_id?: string | null
          provider_signature?: string | null
          raw_payload?: Json | null
          status?: Database["public"]["Enums"]["payment_status"]
          updated_at?: string
        }
        Update: {
          amount_paise?: number
          created_at?: string
          currency?: string
          id?: string
          order_id?: string
          provider?: string
          provider_order_id?: string | null
          provider_payment_id?: string | null
          provider_signature?: string | null
          raw_payload?: Json | null
          status?: Database["public"]["Enums"]["payment_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      pincodes: {
        Row: {
          city: string
          estimated_delivery_hours: number
          express_available: boolean
          is_serviceable: boolean
          pincode: string
          state: string
        }
        Insert: {
          city: string
          estimated_delivery_hours?: number
          express_available?: boolean
          is_serviceable?: boolean
          pincode: string
          state: string
        }
        Update: {
          city?: string
          estimated_delivery_hours?: number
          express_available?: boolean
          is_serviceable?: boolean
          pincode?: string
          state?: string
        }
        Relationships: []
      }
      product_images: {
        Row: {
          alt_text: string | null
          created_at: string
          id: string
          is_primary: boolean
          product_id: string
          sort_order: number
          storage_path: string
        }
        Insert: {
          alt_text?: string | null
          created_at?: string
          id?: string
          is_primary?: boolean
          product_id: string
          sort_order?: number
          storage_path: string
        }
        Update: {
          alt_text?: string | null
          created_at?: string
          id?: string
          is_primary?: boolean
          product_id?: string
          sort_order?: number
          storage_path?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_images_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_variants: {
        Row: {
          compare_at_price_paise: number | null
          created_at: string
          height_approx: string | null
          id: string
          is_active: boolean
          pot_size: string | null
          price_paise: number
          product_id: string
          sku: string
          updated_at: string
          variant_name: string
          weight_grams: number | null
        }
        Insert: {
          compare_at_price_paise?: number | null
          created_at?: string
          height_approx?: string | null
          id?: string
          is_active?: boolean
          pot_size?: string | null
          price_paise: number
          product_id: string
          sku: string
          updated_at?: string
          variant_name: string
          weight_grams?: number | null
        }
        Update: {
          compare_at_price_paise?: number | null
          created_at?: string
          height_approx?: string | null
          id?: string
          is_active?: boolean
          pot_size?: string | null
          price_paise?: number
          product_id?: string
          sku?: string
          updated_at?: string
          variant_name?: string
          weight_grams?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "product_variants_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          botanical_name: string | null
          care_instructions: Json
          category_id: string | null
          created_at: string
          description: string | null
          id: string
          is_featured: boolean
          name: string
          rating: number
          review_count: number
          slug: string
          status: Database["public"]["Enums"]["product_status"]
          tags: string[] | null
          updated_at: string
        }
        Insert: {
          botanical_name?: string | null
          care_instructions?: Json
          category_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_featured?: boolean
          name: string
          rating?: number
          review_count?: number
          slug: string
          status?: Database["public"]["Enums"]["product_status"]
          tags?: string[] | null
          updated_at?: string
        }
        Update: {
          botanical_name?: string | null
          care_instructions?: Json
          category_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_featured?: boolean
          name?: string
          rating?: number
          review_count?: number
          slug?: string
          status?: Database["public"]["Enums"]["product_status"]
          tags?: string[] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          phone: string | null
          status: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          phone?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      refunds: {
        Row: {
          amount_paise: number
          created_at: string
          id: string
          order_id: string
          payment_id: string | null
          provider_refund_id: string | null
          reason: string | null
          status: string
        }
        Insert: {
          amount_paise: number
          created_at?: string
          id?: string
          order_id: string
          payment_id?: string | null
          provider_refund_id?: string | null
          reason?: string | null
          status?: string
        }
        Update: {
          amount_paise?: number
          created_at?: string
          id?: string
          order_id?: string
          payment_id?: string | null
          provider_refund_id?: string | null
          reason?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "refunds_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "refunds_payment_id_fkey"
            columns: ["payment_id"]
            isOneToOne: false
            referencedRelation: "payments"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          created_at: string
          id: string
          images: string[] | null
          is_verified_purchase: boolean
          order_id: string | null
          product_id: string
          rating: number
          review_text: string
          title: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          images?: string[] | null
          is_verified_purchase?: boolean
          order_id?: string | null
          product_id: string
          rating: number
          review_text: string
          title?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          images?: string[] | null
          is_verified_purchase?: boolean
          order_id?: string | null
          product_id?: string
          rating?: number
          review_text?: string
          title?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      shipments: {
        Row: {
          created_at: string
          delivered_at: string | null
          id: string
          order_id: string
          provider: string
          shipped_at: string | null
          status: string
          tracking_number: string | null
          tracking_url: string | null
        }
        Insert: {
          created_at?: string
          delivered_at?: string | null
          id?: string
          order_id: string
          provider?: string
          shipped_at?: string | null
          status?: string
          tracking_number?: string | null
          tracking_url?: string | null
        }
        Update: {
          created_at?: string
          delivered_at?: string | null
          id?: string
          order_id?: string
          provider?: string
          shipped_at?: string | null
          status?: string
          tracking_number?: string | null
          tracking_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shipments_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      stores: {
        Row: {
          address: Json
          city: string
          code: string
          created_at: string
          id: string
          is_active: boolean
          name: string
          phone: string | null
          state: string
        }
        Insert: {
          address?: Json
          city?: string
          code: string
          created_at?: string
          id?: string
          is_active?: boolean
          name: string
          phone?: string | null
          state?: string
        }
        Update: {
          address?: Json
          city?: string
          code?: string
          created_at?: string
          id?: string
          is_active?: boolean
          name?: string
          phone?: string | null
          state?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      wishlist: {
        Row: {
          created_at: string
          id: string
          product_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          product_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          product_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wishlist_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      cancel_order_transaction: {
        Args: { p_order_id: string; p_reason: string; p_user_id?: string }
        Returns: Json
      }
      confirm_order_from_hold: {
        Args: { p_hold_id: string; p_order_id: string }
        Returns: Json
      }
      create_order_transaction: {
        Args: {
          p_coupon_code: string
          p_customer_note: string
          p_hold_id?: string
          p_items: Json
          p_shipping_address: Json
          p_user_id: string
        }
        Returns: Json
      }
      create_plant_hold: {
        Args: {
          p_hold_minutes?: number
          p_items: Json
          p_session_id: string
          p_user_id: string
        }
        Returns: Json
      }
      generate_order_number: { Args: never; Returns: string }
      is_admin: { Args: { p_user_id?: string }; Returns: boolean }
      is_staff: { Args: { p_user_id?: string }; Returns: boolean }
      release_expired_plant_holds: { Args: never; Returns: Json }
      release_plant_hold: {
        Args: { p_hold_id: string; p_user_id?: string }
        Returns: Json
      }
    }
    Enums: {
      app_role: "customer" | "staff" | "admin"
      hold_status: "active" | "converted" | "expired" | "cancelled"
      order_status:
        | "pending"
        | "confirmed"
        | "processing"
        | "shipped"
        | "delivered"
        | "cancelled"
        | "refunded"
      payment_status: "pending" | "paid" | "failed" | "refunded"
      product_status: "draft" | "active" | "archived"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      app_role: ["customer", "staff", "admin"],
      hold_status: ["active", "converted", "expired", "cancelled"],
      order_status: [
        "pending",
        "confirmed",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
        "refunded",
      ],
      payment_status: ["pending", "paid", "failed", "refunded"],
      product_status: ["draft", "active", "archived"],
    },
  },
} as const
